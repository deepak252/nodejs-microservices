import { Request, Response, NextFunction } from 'express'

export const authenticateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id'] as string
  if (!userId) {
    throw new Error('Unauthorized access')
  }

  req.user = { userId }
  next()
}
