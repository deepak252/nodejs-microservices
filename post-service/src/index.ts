import { createServer } from 'http'
import { SERVER_PORT } from './config/env.js'
import { connectDB } from './config/db.js'
import app from './app.js'
import logger from './utils/logger.js'
import { connectRabbitMQ } from './config/rabbitmq.js'

connectDB()
  .then(() => {
    const httpServer = createServer(app)

    connectRabbitMQ()

    httpServer.listen(SERVER_PORT, () => {
      logger.info(`Post Service is running on PORT : ${SERVER_PORT}`)
    })
  })
  .catch((err) => {
    logger.error('ERROR Starting Server', err)
    process.exit(1)
  })

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at ${promise}, reason: ${reason}`)
})
