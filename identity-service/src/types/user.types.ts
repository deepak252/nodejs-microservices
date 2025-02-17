export interface IUser {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  refreshToken?: string
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>
  generateAccessToken(): string
  generateRefreshToken(): string
}
