import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis' // A redis store for the express-rate-limit middleware.
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { redisClient } from '../../config/redis'
import logger from '../../utils/logger'
import { ResponseFailure } from '../utils/ApiResponse'

export const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'identity_service',
  points: 10,
  duration: 1 // 10 requests in 1 second
})

export const sensitiveRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
  standardHeaders: true,
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip}`)
    res.status(429).send(new ResponseFailure('Too many requests'))
  },
  store: new RedisStore({
    sendCommand: (...args: Parameters<typeof redisClient.call>) =>
      redisClient.call(...args) as any
  })
})
