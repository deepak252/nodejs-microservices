import { Router } from 'express'
import { uploadMedia } from '../controllers/mediaController'
import { authenticateRequest } from '../middlewares/authMiddleware'
import uploadMiddleware from '../middlewares/uploadMiddleware'

const router = Router()

router.use(authenticateRequest)

router.post('/upload', uploadMiddleware({}), uploadMedia)

export default router
