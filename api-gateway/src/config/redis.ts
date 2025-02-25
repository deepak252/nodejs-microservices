import { Redis } from 'ioredis'
import { REDIS_URL } from './env.js'
import logger from '../utils/logger.js'

const redisClient = new Redis(REDIS_URL)

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
