import Media from '../models/Media'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import logger from '../utils/logger'

// {
//   "fieldname": "file",
//   "originalname": "assessments.png",
//   "encoding": "7bit",
//   "mimetype": "image/png",
//   "destination": "uploads/",
//   "filename": "2025_02_20_18_05_40_911.png",
//   "path": "uploads/2025_02_20_18_05_40_911.png",
//   "size": 23540
// }

export const uploadMedia = asyncHandler(async (req, _) => {
  if (!req.file) {
    throw new ApiError('No file found')
  }
  const { originalname, mimetype } = req.file
  const userId = req.user.userId

  const media = new Media({
    publicId: '',
    originalName: originalname,
    user: userId,
    url: ''
  })

  return new ResponseSuccess('File uploaded successfully')
})
