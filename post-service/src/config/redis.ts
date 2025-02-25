import { Redis } from 'ioredis'
import { REDIS_URL } from './env.js'
import logger from '../utils/logger.js'

const redisClient = new Redis(REDIS_URL)

redisClient.on('connect', () => {
  logger.info('✅ Connected to Redis!')

  // process.on('SIGINT', disconnectRedis) // Handles Ctrl + C
  // process.on('SIGTERM', disconnectRedis) // Handles kill or docker stop
})

redisClient.on('error', (err) => {
  logger.error(`❌ Redis connection error: `, err)
})

redisClient.on('close', () => {
  logger.info('❌ Redis connection closed')
})

// const disconnectRedis = () => {
//   try {
//     logger.info('❌ Disconnecting Redis...')
//     redisClient.disconnect()
//   } catch (err) {
//     logger.error('⚠️ Error disconnecting Redis:', err)
//   } finally {
//     process.exit(0) // Ensures clean exit
//   }
// }

export { redisClient }
