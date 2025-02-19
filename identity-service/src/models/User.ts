import { Schema, model, HydratedDocument, Model } from 'mongoose'
import { IUser, IUserMethods } from '../types/user.types'
import {
  comparePassword,
  generateAccessToken,
  generatePasswordHash,
  generateRefreshToken
} from '../utils/authUtil'

interface UserModel extends Model<IUser, object, IUserMethods> {
  findByUsername(
    username: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>
  findByEmail(email: string): Promise<HydratedDocument<IUser, IUserMethods>>
  findByUsernameOrEmail(
    username: string,
    email: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Username is required']
      // minLength: [4, 'Username must contain at least 4 characters'],
      // maxLength: [20, 'Username should not contain more than 20 characters']
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required']
      // match: [REGEX.EMAIL, 'Invalid email']
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required']
    },
    refreshToken: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    statics: {
      findByUsername(username) {
        return this.findOne({ username })
      },
      findByEmail(email) {
        return this.findOne({ email })
      },
      findByUsernameOrEmail(username, email) {
        return this.findOne({
          $or: [{ email }, { username }]
        })
      }
    }
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      if (this.password.length < 4) {
        throw new Error('Password must contain at least 4 characters')
      }
      this.password = await generatePasswordHash(this.password)
    } catch (error: any) {
      return next(error)
    }
  }
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await comparePassword(candidatePassword, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return generateAccessToken({
    userId: this._id.toString(),
    email: this.email,
    username: this.username
  })
}

userSchema.methods.generateRefreshToken = function () {
  return generateRefreshToken({
    userId: this._id.toString()
  })
}

userSchema.set('toJSON', {
  transform: (_, ret: Partial<IUser>) => {
    delete ret.password
    delete ret.refreshToken
    return ret
  }
})

const User = model<IUser, UserModel>('User', userSchema)
export default User
