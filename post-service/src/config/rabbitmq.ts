import amqp from 'amqplib'
import { RABBITMQ_URL } from './env'
import logger from '../utils/logger'

let connection: amqp.Connection | null = null
let channel: amqp.Channel | null = null

const connectRabbitMQ = async () => {
  if (connection && channel) {
    return { channel, connection }
  }
  try {
    connection = await amqp.connect(RABBITMQ_URL)
    channel = await connection.createChannel()

    logger.info('Connected to RabbitMQ')
    // close on process exit

    const closeRabbitMQ = async () => {
      if (connection) {
        logger.info('❌ Closing RabbitMQ connection...')
        await connection.close()
        connection = null
        channel = null
        process.exit(0)
      }
    }
    process.on('SIGINT', closeRabbitMQ) // Handles Ctrl + C
    process.on('SIGTERM', closeRabbitMQ) // Handles kill or docker stop

    return { channel, connection }
  } catch (e: any) {
    logger.error('Error connecting to RabbitMQ: ', e)
  }
}

export { connectRabbitMQ }
