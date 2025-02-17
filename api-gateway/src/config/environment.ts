import dotenv from 'dotenv'
dotenv.config()

export const {
  NODE_ENV = 'development',
  REDIS_URL = '',
  SERVER_PORT = 3000,
  COOKIE_SECRET = 'SECRET',
  MONGO_URI,
  REDIS_PORT = '6379',
  REDIS_PASSWORD = '',
  CLIENT_URL = ''
} = process.env
