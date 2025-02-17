import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes/index.js'
import { ApiResponse } from './utils/ApiResponse.js'
import { errorHandler } from './middlewares/errorHandler.js'
import logger from './utils/logger.js'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(
  cors({
    origin: '*'
    // credentials: true
  })
)
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`)
  next()
})
app.use('/api', router)
app.get('/', (req, res) => {
  // logger.info(req.session.user)
  res.json(new ApiResponse('Server is up'))
})

app.use(errorHandler)

export default app
