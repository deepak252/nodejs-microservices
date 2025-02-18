import Post from '../models/Post'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import { validateCreatePost } from '../utils/validation'

export const createPost = asyncHandler(async (req, _) => {
  const { content = '', mediaIds = [] } = req.body

  const { error } = validateCreatePost({ content })
  if (error) {
    throw new ApiError(error.details[0].message)
  }

  let post = new Post({
    user: req.user.userId,
    content,
    mediaIds
  })
  post = await post.save()

  return new ResponseSuccess(
    'Post created successfully',
    { ...post.toJSON() },
    201
  )
})

export const getAllPosts = asyncHandler(async (req, _) => {})

export const getPost = asyncHandler(async (req, _) => {})

export const deletePost = asyncHandler(async (req, _) => {})
