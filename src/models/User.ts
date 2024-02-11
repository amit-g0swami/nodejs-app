import mongoose from 'mongoose'
import { CREATED_AS } from '../types/shared.interface'

const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAs: {
    type: String,
    required: true,
    enum: [CREATED_AS.CUSTOMER, CREATED_AS.SELLER]
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    default: null
  }
})

const User = mongoose.model('user', UserSchema)

export default User
