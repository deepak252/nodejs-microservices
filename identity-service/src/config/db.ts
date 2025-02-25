import mongoose from 'mongoose'
import { MONGO_URI } from './env.js'
import logger from '../utils/logger.js'

export const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('Mongo URL empty')
    }
    logger.info('Connecting to database...')
    await mongoose.connect(MONGO_URI)

    logger.info('✅ Successfully connected to the database')
  } catch (e) {
    logger.error('❌ Error connect to database', e)
    process.exit(1)
  }
}
