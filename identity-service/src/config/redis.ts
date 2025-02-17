import { Redis } from 'ioredis'
import { REDIS_URL } from './environment.js'

const redisClient = new Redis(REDIS_URL)

redisClient.on('connect', () => {
  console.log('Connected to Redis!')
})

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err)
})

redisClient.on('close', () => {
  console.error('Redis connection closed')
})

export { redisClient }
