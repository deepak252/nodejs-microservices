import { Router } from 'express'
import postRouter from './postRoutes'
import { ResponseSuccess } from '../utils/ApiResponse'

const router = Router()

// const wait = async (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms))

// router.use(async (req, res, next) => {
//   await wait(500)
//   next()
// })

router.get('/', (req, res) => {
  res.json(new ResponseSuccess('Post Service is Up'))
})

router.use('/posts', postRouter)

export default router
