import User from '../models/User'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import { validateRegistration } from '../utils/validation'
import asyncHandler from '../utils/asyncHandler'

export const registerUser = asyncHandler(async (req, _) => {
  const { username, email, password } = req.body

  const { error } = validateRegistration({ username, email, password })
  if (error) {
    throw new ApiError(error.details[0].message)
  }
  let user = new User({
    username,
    email,
    password
  })
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken

  user = await user.save()

  return new ResponseSuccess(
    'Sign up successful',
    { user: user.toJSON(), accessToken, refreshToken },
    201
  )
})
