import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { removeFile } from '../../utils/fileUtil'
import { ApiError } from '../utils/ApiError'
import logger from '../../utils/logger'

const destPath = 'uploads/'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the 'uploads' folder if it doesn't exist
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true })
    }
    // Store files in the 'uploads/' directory
    cb(null, destPath)
  },
  filename: function (req, file, cb) {
    // const filename = getFileName(req.user, file)
    const filename = `${req.user.userId}_${new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, '_')
      .substring(0, 23)}${path.extname(file.originalname)}`
    cb(null, filename)
    //Ref: https://github.com/expressjs/multer/issues/259#issuecomment-691748926
    req.on('aborted', () => {
      logger.info('Upload file aborted')
      file.stream.on('end', () => {
        removeFile(path.join(destPath, filename))
      })
      file.stream.emit('end')
    })
  }
})

const uploadMiddleware = ({
  fieldName = 'file',
  fileMaxKb = 10 * 1024,
  type = 'single',
  maxCount = 1,
  allowedExtensions = []
}: {
  fieldName?: string
  type?: 'single' | 'multiple'
  fileMaxKb?: number
  maxCount?: number
  allowedExtensions?: string[] // eg. [".png", ".jpg", ".jpeg", ".gif", ".pdf"]
}) => {
  const multr = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase()
      if (allowedExtensions?.length && !allowedExtensions.includes(ext)) {
        return cb(
          new Error(
            `Invalid file type. Allowed: ${allowedExtensions.join(', ')}`
          )
        )
      }
      cb(null, true)
    },
    limits: {
      fileSize: fileMaxKb * 1024
    }
  })

  return (req: Request, res: Response, next: NextFunction) => {
    const upload =
      type === 'single'
        ? multr.single(fieldName)
        : multr.array(fieldName, maxCount)

    upload(req, res, (err) => {
      if (err) {
        next(new ApiError(err.message))
      } else {
        next()
      }
    })
  }
}
export default uploadMiddleware

// export default multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype.startsWith('image')) {
//       cb(null, true)
//     } else {
//       cb(new Error('Only image file allowed'))
//     }
//   },
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10 mb
//   }
// })

// export default multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 5 mb
//   }
// }).single('file')
