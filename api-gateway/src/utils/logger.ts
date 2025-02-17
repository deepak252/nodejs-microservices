import winston from 'winston'
import { NODE_ENV } from '../config/environment'

const logger = winston.createLogger({
  level: NODE_ENV === 'production' ? 'info' : 'debug',
  // format the messages
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(), // enable message templating
    winston.format.json() // log messages in json
  ),
  defaultMeta: { service: 'api-gateway' },
  // output destination of logs, eg. console, file
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'combined.log'
    })
  ]
})

export default logger
