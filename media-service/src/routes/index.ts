import { Router } from 'express'
import mediaRouter from './mediaRoutes'

const router = Router()

// const wait = async (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms))

// router.use(async (req, res, next) => {
//   await wait(500)
//   next()
// })

router.use('/media', mediaRouter)

export default router
