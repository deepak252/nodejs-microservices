import { Router } from 'express'
import mediaRouter from './mediaRoutes'
import { ResponseSuccess } from '../utils/ApiResponse'

const router = Router()

// const wait = async (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms))

// router.use(async (req, res, next) => {
//   await wait(500)
//   next()
// })

router.use('/media', mediaRouter)

router.get('/', (req, res) => {
  res.json(new ResponseSuccess('Media Service is Up'))
})

export default router
