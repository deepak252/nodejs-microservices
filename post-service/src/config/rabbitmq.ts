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

    logger.info('✅ Connected to RabbitMQ')
    // close on process exit

    // process.on('SIGINT', closeRabbitMQ) // Handles Ctrl + C
    // process.on('SIGTERM', closeRabbitMQ) // Handles kill or docker stop

    return { channel, connection }
  } catch (e: any) {
    logger.error('❌ Error connecting to RabbitMQ: ', e)
  }
}

// const closeRabbitMQ = async () => {
//   try {
//     if (connection) {
//       logger.info('❌ Closing RabbitMQ connection...')
//       await connection.close()
//       connection = null
//       channel = null
//     }
//   } catch (err) {
//     logger.error('⚠️ Error closing RabbitMQ:', err)
//   } finally {
//     process.exit(0) // Ensures clean exit
//   }
// }

// const publishEvent = async (exchange: string) => {
//   try {
//     await channel?.assertExchange(exchange, )
//   } catch (err) {
//     logger.error('⚠️ Error closing RabbitMQ:', err)
//   }
// }

export { connectRabbitMQ, channel, connection }
