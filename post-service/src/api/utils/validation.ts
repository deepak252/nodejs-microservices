import Joi from 'joi'

export const validateCreatePost = ({ content }: { content: string }) => {
  const schema = Joi.object({
    content: Joi.string().min(5).max(5000).required()
  })
  return schema.validate({ content })
}
