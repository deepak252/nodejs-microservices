import { channel } from '../config/rabbitmq'
import MediaService from '../services/MediaService'
import logger from '../utils/logger'

export const deleteMediaWorker = async () => {
  if (!channel) {
    return
  }
  const exchange = 'media.direct'
  const routingKey = 'media.delete'
  const queue = 'media.queue'

  await channel.assertExchange(exchange, 'direct', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange, routingKey)

  channel.consume(queue, (msg) => {
    if (msg?.content) {
      const content = JSON.parse(msg.content.toString())
      if (content.postId) {
        MediaService.deleteMultipleMedia(content.mediaIds)
      }
      logger.info(`Event recieved: ${routingKey}, ${content}`)
      channel?.ack(msg)
    }
  })

  logger.info(`Subscribed to event: ${routingKey}`)
}
