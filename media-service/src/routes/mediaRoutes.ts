import { Router } from 'express'
import { uploadMedia } from '../controllers/mediaController'
import { authenticateRequest } from '../middlewares/authMiddleware'
import uploadMiddleware from '../middlewares/uploadMiddleware'
import { ApiError } from '../utils/ApiError'

const router = Router()

router.use(authenticateRequest)

router.post(
  '/upload',
  (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        next(new ApiError(err.message))
      } else {
        next()
      }
    })
  },
  // uploadMiddleware,
  uploadMedia
)

export default router
