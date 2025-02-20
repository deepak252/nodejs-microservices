import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
import logger from '../utils/logger'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}).single('file')

export const authenticateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, function (err) {
    logger.error('Multer error while uploading: ', err)
    return
  })
  next()
}
