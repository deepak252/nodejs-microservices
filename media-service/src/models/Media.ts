import { Schema, model, Model } from 'mongoose'
import { IMedia, IMediaMethods } from '../types/media.types'

interface MediaModel extends Model<IMedia, object, IMediaMethods> {
  test: () => void
}

const mediaSchema = new Schema<IMedia, MediaModel, IMediaMethods>(
  {
    publicId: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

mediaSchema.index({ content: 'text' })

const Media = model<IMedia, MediaModel>('Media', mediaSchema)
export default Media
