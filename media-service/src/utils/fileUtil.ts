import fs from 'fs'
import logger from './logger.js'

export const getFileExtension = (filename = '') => {
  const split = filename.split('.')
  if (split && split.length > 1) {
    return split.pop()
  }
}

export const removeFile = (filePath: string) => {
  if (!filePath) return
  fs.unlink(filePath, (err) => {
    if (err) {
      logger.error(`Error while removing file: ${filePath}`, err)
      // throw err;
    }
  })
}

// export const createDirectoryIfNotExists = (path) => {
//   try {
//     if (!fs.existsSync(path)) {
//       fs.mkdirSync(path, { recursive: true })
//     }
//   } catch (e) {
//     logger.error(e, 'createDirectoryIfNotExists')
//   }
// }
