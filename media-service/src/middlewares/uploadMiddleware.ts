import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { removeFile } from '../utils/fileUtil'
import logger from '../utils/logger'

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
    const filename = `${new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, '_')
      .substring(0, 23)}${path.extname(file.originalname)}`
    cb(null, filename)
    //Ref: https://github.com/expressjs/multer/issues/259#issuecomment-691748926
    req.on('aborted', () => {
      logger.info('Upload file aported')
      file.stream.on('end', () => {
        removeFile(path.join(destPath, filename))
      })
      file.stream.emit('end')
    })
  }
})

// export default multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 5 mb
//   }
// }).single('file')

export default multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      cb(new Error('Only image file allowed'))
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 mb
  }
}).single('file')
