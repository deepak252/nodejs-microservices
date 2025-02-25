import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError.js'
import { NODE_ENV } from '../config/env.js'
import { ResponseFailure } from '../utils/ApiResponse.js'
import logger from '../utils/logger.js'

export const errorHandler = (
  err: ApiError | Error,
  _: Request,
  res: Response,
  __: NextFunction
): void => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500
  const message = err.message || 'Internal Server Error'
  const stack = NODE_ENV === 'production' ? undefined : err.stack

  logger.error(err)
  res.status(statusCode).json(new ResponseFailure(message, statusCode, stack))
}
