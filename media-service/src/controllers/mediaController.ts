import asyncHandler from '../utils/asyncHandler'
import logger from '../utils/logger'

export const uploadMedia = asyncHandler(async (req, _) => {
  if (!req.file) {
    throw new Error('No file found')
  }
  const { originalName, mimeType, buffer } = req.file
  const userId = req.user.userId

  
})
