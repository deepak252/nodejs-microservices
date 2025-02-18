import dotenv from 'dotenv'
dotenv.config()

export const {
  NODE_ENV = 'development',
  REDIS_URL = 'redis://localhost:6379',
  REDIS_PORT = '6379',
  SERVER_PORT = 3000,
  COOKIE_SECRET = 'SECRET',
  MONGO_URI,
  REDIS_PASSWORD = '',
  IDENTITY_SERVICE_URL = 'http://localhost:3001',
  POST_SERVICE_URL = 'http://localhost:3002',
  ACCESS_TOKEN_SECRET = 'STOREDEVACESSSECRETJWT12349876'
} = process.env
