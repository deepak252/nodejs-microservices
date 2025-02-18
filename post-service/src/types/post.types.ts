import { Schema } from 'mongoose'

export interface IPost {
  user: Schema.Types.ObjectId
  content: string
  mediaIds: string[]
  createdAt: Date
  updatedAt: Date
}

export interface IPostMethods {
  test: () => void
  //
}
