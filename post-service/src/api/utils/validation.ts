import Joi from 'joi'

export const validateCreatePost = ({
  content,
  mediaIds
}: {
  content: string
  mediaIds: string[]
}) => {
  const schema = Joi.object({
    content: Joi.string().min(5).max(5000).required(),
    mediaIds: Joi.array<string>().max(2)
  })
  return schema.validate({ content, mediaIds })
}
