import Joi from 'joi'

export const validateUploadMedia = ({
  username,
  email,
  password
}: {
  username: string
  email: string
  password: string
}) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).max(30).required()
  })
  return schema.validate({ username, email, password })
}
