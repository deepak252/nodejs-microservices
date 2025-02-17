import { Router } from 'express'
import authRouter from './authRoutes.js'

const router = Router()

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

router.use(async (req, res, next) => {
  await wait(1000)
  next()
})

router.use('/auth', authRouter)

export default router
