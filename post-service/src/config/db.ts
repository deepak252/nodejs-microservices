import mongoose from 'mongoose'
import { MONGO_URI } from './env.js'
import logger from '../utils/logger.js'

export const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error('Mongo URL empty')
    }
    logger.info('Connecting to db...')
    await mongoose.connect(MONGO_URI)

    // process.on('SIGINT', disconnectDB) // Handles Ctrl + C
    // process.on('SIGTERM', disconnectDB) // Handles kill or docker stop

    logger.info('✅ Successfully connected to the database')
  } catch (e) {
    logger.error('❌ Error connect to database', e)
    process.exit(1)
  }
}

// const disconnectDB = async () => {
//   try {
//     logger.info('❌ Disconnecting database...')
//     await mongoose.disconnect()
//   } catch (err) {
//     logger.error('⚠️ Error disconnecting database:', err)
//   } finally {
//     process.exit(0) // Ensures clean exit
//   }
// }
