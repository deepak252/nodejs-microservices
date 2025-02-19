import dotenv from 'dotenv'
dotenv.config()

export const {
  NODE_ENV = 'development',
  SERVER_PORT = 3001,
  REDIS_URL = 'redis://localhost:6379',
  REDIS_PORT = '6379',
  REDIS_PASSWORD = '',
  MONGO_URI = '',
  ACCESS_TOKEN_SECRET = 'STOREDEVACESSSECRETJWT12349876',
  REFRESH_TOKEN_SECRET = 'STOREDEVREFRESHSECRETJWT12349876',
  ACCESS_TOKEN_EXPIRY = '100d',
  REFRESH_TOKEN_EXPIRY = '100d'
} = process.env
