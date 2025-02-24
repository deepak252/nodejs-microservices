import PostService from '../../services/PostService'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import { validateCreatePost } from '../utils/validation'
import asyncHandler from '../utils/asyncHandler'

export const createPost = asyncHandler(async (req, _) => {
  const { content = '', mediaIds = [] } = req.body

  const { error } = validateCreatePost({ content, mediaIds })
  if (error) {
    throw new ApiError(error.details[0].message)
  }

  const post = await PostService.createPost(req.user.userId, content, mediaIds)

  return new ResponseSuccess(
    'Post created successfully',
    { ...post.toJSON() },
    201
  )
})

export const getAllPosts = asyncHandler(async (req, _) => {
  const { page = 1, limit = 10 } = req.query
  const result = await PostService.getPosts(Number(page), Number(limit))

  return new ResponseSuccess('Posts fetched successfully', result)
})

export const getPost = asyncHandler(async (req, _) => {
  const { postId } = req.params

  const result = await PostService.getPost(postId)
  if (!result) {
    throw new ApiError('Post not found')
  }
  return new ResponseSuccess('Post fetched successfully', result)
})

export const deletePost = asyncHandler(async (req, _) => {
  const { postId } = req.params

  const result = await PostService.deletePost(postId, req.user.userId)
  if (!result) {
    throw new ApiError('Post not found')
  }
  return new ResponseSuccess('Post deleted successfully', result)
})
