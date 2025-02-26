import { Redis } from 'ioredis'
import { REDIS_HOST, REDIS_PORT } from './env.js'
import logger from '../utils/logger.js'

const redisClient = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  retryStrategy: () => null
})

redisClient.on('connect', () => {
  logger.info('✅ Connected to Redis!')
})

redisClient.on('error', (err) => {
  logger.error(`❌ Redis connection error: `, err)
})

redisClient.on('close', () => {
  logger.info('❌ Redis connection closed')
})

export { redisClient }
