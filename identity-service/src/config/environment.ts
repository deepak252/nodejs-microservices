import dotenv from 'dotenv'
dotenv.config()

export const {
  NODE_ENV = 'development',
  REDIS_URL = '',
  SERVER_PORT = 3001,
  COOKIE_SECRET = 'SECRET',
  MONGO_URI,
  REDIS_URI = 'redis',
  REDIS_PORT = '6379',
  REDIS_PASSWORD = '',
  ACCESS_TOKEN_SECRET = '',
  REFRESH_TOKEN_SECRET = '',
  ACCESS_TOKEN_EXPIRY = '',
  REFRESH_TOKEN_EXPIRY = '',
  CLIENT_URL = ''
} = process.env
