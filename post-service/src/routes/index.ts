import { Router } from 'express'
import postRouter from './postRoutes'

const router = Router()

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

router.use(async (req, res, next) => {
  await wait(500)
  next()
})

router.use('/posts', postRouter)

export default router
