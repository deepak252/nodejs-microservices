import { Schema, model, Model } from 'mongoose'
import { IPost, IPostMethods } from '../types/post.types'

interface PostModel extends Model<IPost, object, IPostMethods> {
  test: () => void
}

const postSchema = new Schema<IPost, PostModel, IPostMethods>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    mediaIds: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
)

postSchema.index({ content: 'text' })

const Post = model<IPost, PostModel>('Post', postSchema)
export default Post
