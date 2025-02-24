import fs from 'fs'
import { S3Service } from '../../services/S3Service'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import Media from '../../models/Media'

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
  try {
    if (!req.file) {
      throw new ApiError('No file found')
    }
    const s3Service = new S3Service('uploads')

    const result = await s3Service.uploadToS3(req.file)

    if (!result) {
      throw new ApiError('Unable to upload file')
    }

    const media = new Media({
      publicId: result?.key,
      originalName: req.file.originalname,
      user: req.user.userId,
      mimeType: req.file.mimetype,
      url: result?.location
    })

    await media.save()

    return new ResponseSuccess(
      'File uploaded successfully',
      media.toJSON(),
      201
    )
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
  }
})
