import Media from '../models/Media'
import logger from '../utils/logger'
import { S3Service } from './S3Service'

export default class MediaService {
  static getAllMedia = async (page: number, limit: number) => {
    const startIndex = (page - 1) * limit
    const medias = await Media.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
    const totalItems = await Media.countDocuments()

    const pagination = {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      itemsPerPage: limit
    }

    const result = {
      medias,
      pagination
    }

    return result
  }

  static deleteSingleMedia = async (mediaId: string) => {
    const s3Service = new S3Service('uploads')

    const media = await Media.findOneAndDelete({
      _id: mediaId
    })
    if (media) {
      await s3Service.deleteFromS3(media.publicId)
      logger.info(`Media deleted successfully: ${mediaId}`)
    }

    // if (post) {
    //   await this.invalidatePostCache(postId)
    // }
    return media
  }

  static deleteMultipleMedia = async (mediaIds: string[]) => {
    // const mediaRecords = await Media.find({ _id: { $in: mediaIds } })
    // for (const media of mediaRecords) {
    // }
    for (const mediaId of mediaIds) {
      await this.deleteSingleMedia(mediaId)
    }
    return true
  }
}
