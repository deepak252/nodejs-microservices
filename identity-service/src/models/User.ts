import { Schema, model, HydratedDocument, Model } from 'mongoose'
import bcryptjs from 'bcryptjs'
import { REGEX } from '../constants'
import { IUser, IUserMethods } from '../types/user.types'

interface UserModel extends Model<IUser, object, IUserMethods> {
  findByEmail(name: string): Promise<HydratedDocument<IUser, IUserMethods>>
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Username is required'],
      minLength: [4, 'Username must contain at least 4 characters'],
      maxLength: [20, 'Username should not contain more than 20 characters']
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required'],
      match: [REGEX.EMAIL, 'Invalid email']
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    statics: {
      findByEmail(email) {
        return this.findOne({ email })
      }
    }
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    try {
      if (this.password.length < 4) {
        throw new Error('Password must contain at least 4 characters')
      }
      this.password = await bcryptjs.hash(this.password, 10)
    } catch (error: any) {
      return next(error)
    }
  }
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcryptjs.compare(candidatePassword, this.password)
}

const User = model<IUser, UserModel>('User', userSchema)
export default User
