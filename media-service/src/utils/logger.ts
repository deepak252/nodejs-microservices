import winston from 'winston'
import { NODE_ENV } from '../config/env'

const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    winston.format.ms(), // Adds execution time (ms)
    winston.format.splat(), // Enable string templating
    winston.format.errors({ stack: true }), // Capture stack traces for errors
    winston.format.json() // Use JSON format for structured logging
  ),
  transports: [
    // Error logs
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.json()
    }),

    // All logs (info, warn, error)
    new winston.transports.File({
      filename: 'combined.log',
      format: winston.format.json()
    })
  ]
})

// Add Console Logging in Development Mode
if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorized output in console
        winston.format.simple(), // Human-readable format
        winston.format.printf(({ level, message, timestamp, ms, stack }) => {
          return `${timestamp} [${level}]: ${message} ${ms ? `(${ms})` : ''} ${stack ? `\n${stack}` : ''}`
        })
      )
    })
  )
}

export default logger
