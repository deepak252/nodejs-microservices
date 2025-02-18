import { Router } from 'express'
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost
} from '../controllers/postController'
import { authenticateRequest } from '../middlewares/authMiddleware'

const router = Router()

router.use(authenticateRequest)

router.post('/create', createPost)
router.get('/all', getAllPosts)
router.get('/:postId', getPost)
router.delete('/delete', deletePost)

export default router
