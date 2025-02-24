import { Schema } from 'mongoose'

export interface IMedia {
  publicId: string
  originalName: string
  url: string
  mimeType: string
  user: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface IMediaMethods {
  test: () => void
  //
}
