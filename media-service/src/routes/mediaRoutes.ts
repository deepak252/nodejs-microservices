import { Router } from 'express'
import multer from 'multer'
import { uploadMedia } from '../controllers/mediaController'

import { authenticateRequest } from '../middlewares/authMiddleware'
import logger from '../utils/logger'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}).single('file')

router.use(authenticateRequest)

router.post('/upload', (req, res, next) => {
  upload(req, res, function (err) {
    logger.error('Multer error while uploading: ', err)
    return 
  })
})

export default router
