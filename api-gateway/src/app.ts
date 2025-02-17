import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { ApiResponse } from './utils/ApiResponse.js'
import { errorHandler } from './middlewares/errorHandler.js'
import logger from './utils/logger.js'
import { rateLimiter } from './middlewares/rateLimiter.js'
import { ProxyOptions } from 'express-http-proxy'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(
  cors({
    origin: '*'
    // credentials: true
  })
)
app.use(rateLimiter)

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`)
  next()
})

const proxyOptions: ProxyOptions = {
  proxyReqPathResolver: function (req) {
    return req.originalUrl.replace(/^\/v1/, '/api')
  },
  proxyErrorHandler: function (err, res, next) {
    logger.error(`Proxy error: ${err.message}`)
  }
}

app.get('/', (req, res) => {
  // logger.info(req.session.user)
  res.json(new ApiResponse('API-gateway is up'))
})

app.use(errorHandler)
export default app
