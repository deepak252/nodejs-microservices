import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis' // A redis store for the express-rate-limit middleware.
import { redisClient } from '../config/redis'
import { ResponseFailure } from '../utils/ApiResponse'
import logger from '../utils/logger'

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: true,
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip}`)
    res.status(429).send(new ResponseFailure('Too many requests '))
  },
  store: new RedisStore({
    sendCommand: (...args: Parameters<typeof redisClient.call>) =>
      redisClient.call(...args) as any
  })
})
