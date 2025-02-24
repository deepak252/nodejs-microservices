import { Router } from 'express'
import authRouter from './authRoutes.js'
import { ResponseSuccess } from '../utils/ApiResponse.js'

const router = Router()

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

router.use(async (req, res, next) => {
  await wait(1000)
  next()
})

router.use('/auth', authRouter)
router.get('/', (req, res) => {
  res.json(new ResponseSuccess('Identity Service is Up'))
})

export default router
