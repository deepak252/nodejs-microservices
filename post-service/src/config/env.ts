import dotenv from 'dotenv'
dotenv.config()

export const {
  NODE_ENV = 'development',
  SERVER_PORT = 3002,
  REDIS_URL = 'redis://localhost:6379',
  REDIS_PORT = '6379',
  REDIS_PASSWORD = '',
  MONGO_URI = '',
  RABBITMQ_URL = 'amqp://localhost',
  ACCESS_TOKEN_SECRET = 'STOREDEVACESSSECRETJWT12349876'
} = process.env
