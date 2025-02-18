/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { ApiResponse, ResponseFailure } from './utils/ApiResponse.js'
import { errorHandler } from './middlewares/errorHandler.js'
import logger from './utils/logger.js'
import { rateLimiter } from './middlewares/rateLimiter.js'
import proxy, { ProxyOptions } from 'express-http-proxy'
import { IDENTITY_SERVICE_URL } from './config/environment.js'

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
    res
      .status(500)
      .json(new ResponseFailure(`Internal server error: ${err.message}`))
  }
}
// api-gateway -> /v1/auth/register -> 3000
// identity -> /api/auth/register -> 3001
app.use(
  '/v1/auth',
  proxy(IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers!['content-type'] = 'application/json'
      return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from identity-service: ${proxyRes.statusCode}`
      )
      return proxyResData
    }
  })
)

app.get('/', (req, res) => {
  res.json(new ApiResponse('API-gateway is up'))
})

app.use(errorHandler)
export default app
