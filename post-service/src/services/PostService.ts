import { channel } from '../config/rabbitmq'
import { redisClient } from '../config/redis'
import Post from '../models/Post'
import logger from '../utils/logger'

export default class PostService {
  static invalidatePostCache = async (postId?: string) => {
    if (postId) {
      await redisClient.del(`post:${postId}`)
    }
    const keys = await redisClient.keys('posts:*')
    if (keys.length) {
      await redisClient.del(keys)
    }
  }

  static createPost = async (
    userId: string,
    content: string,
    mediaIds: string[] = []
  ) => {
    let post = new Post({
      user: userId,
      content,
      mediaIds
    })
    post = await post.save()

    await this.invalidatePostCache()

    return post
  }

  static getPosts = async (page: number, limit: number) => {
    const startIndex = (page - 1) * limit
    const cacheKey = `posts:${page}:${limit}`
    const cachedPosts = await redisClient.get(cacheKey)
    if (cachedPosts) {
      return JSON.parse(cachedPosts)
    }
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
    const totalItems = await Post.countDocuments()

    const pagination = {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      itemsPerPage: limit
    }

    const result = {
      posts,
      pagination
    }

    await redisClient.setex(cacheKey, 300, JSON.stringify(result)) // delete record after 5 mins

    return result
  }

  static getPost = async (postId: string) => {
    const cacheKey = `post:${postId}`
    const cachedPost = await redisClient.get(cacheKey)
    if (cachedPost) {
      return JSON.parse(cachedPost)
    }
    const post = await Post.findById(postId)
    if (post) {
      await redisClient.setex(cacheKey, 3600, JSON.stringify(post))
      return post
    }
  }

  static deletePost = async (postId: string, userId: string) => {
    const post = await Post.findOneAndDelete({
      _id: postId,
      user: userId
    })
    if (post) {
      if (post.mediaIds.length) {
        await this.publishDeleteMediaEvent({
          postId,
          userId,
          mediaIds: post.mediaIds
        })
      }
      await this.invalidatePostCache(postId)
    }
    return post
  }

  static publishDeleteMediaEvent = async ({
    postId,
    userId,
    mediaIds
  }: {
    postId: string
    userId: string
    mediaIds: string[]
  }) => {
    if (!mediaIds.length) {
      return
    }
    if (!channel) {
      return
    }
    const exchange = 'media.direct'
    const routingKey = 'media.delete'
    await channel.assertExchange(exchange, 'direct', { durable: false })

    channel.publish(
      exchange,
      routingKey,
      Buffer.from(
        JSON.stringify({
          postId,
          userId,
          mediaIds
        })
      )
    )
    logger.info(`Event published: ${routingKey}, ${mediaIds}`)
  }
}
