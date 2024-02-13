import mongoose from 'mongoose'
import { PAYMENT_TYPE } from '../types/shared.interface'

const { Schema } = mongoose

const CustomerOrderSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  sellerId: {
    type: String,
    required: true
  },
  buyerDetails: {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true
    },
    mobileNumber: { type: String, required: true, validate: /^\d{10}$/ }
  },
  orderPlaced: {
    completeAddress: { type: String, required: true },
    landMark: { type: String },
    pinCode: { type: String, required: true, validate: /^\d{6}$/ },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
  },
  orderDetails: {
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
  },
  packageDetails: {
    deadWeight: { type: Number, required: true },
    packageDimension: {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      applicableWeight: { type: Number, required: true }
    }
  },
  paymentDetails: {
    paymentMode: {
      type: String,
      required: true,
      enum: [PAYMENT_TYPE.COD, PAYMENT_TYPE.PREPAID]
    }
  },
  isSavedToShiprocket: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const CustomerOrder = mongoose.model('customerOrder', CustomerOrderSchema)

export default CustomerOrder
