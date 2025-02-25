import { createServer } from 'http'
import { SERVER_PORT } from './config/env.js'
import app from './app.js'
import logger from './utils/logger.js'

const httpServer = createServer(app)

httpServer.listen(SERVER_PORT, () => {
  logger.info(`🚀 API Gateway is running on port : ${SERVER_PORT}`)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`❌ Unhandled Rejection at ${promise}, reason: ${reason}`)
})
