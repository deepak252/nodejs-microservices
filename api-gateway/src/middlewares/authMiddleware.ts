import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { ACCESS_TOKEN_SECRET } from '../config/env'

export const validateAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization?.replace('Bearer ', '')
    if (!accessToken) {
      throw new Error('Unauthorized access')
    }
    const decodedToken = jwt.verify(
      accessToken,
      ACCESS_TOKEN_SECRET
    ) as JwtPayload
    req.user = decodedToken
    next()
  } catch (e: any) {
    next(new ApiError(e?.message || 'Unauthorized access', 401))
  }
}
