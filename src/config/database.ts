import mongoose from 'mongoose'
import { Logger } from '../logger/logger.lib'

mongoose.set('strictQuery', false)

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string)
    Logger.info('Connected to MongoDB')
  } catch (error) {
    Logger.error('Error connecting to MongoDB:', error)
  }
}

export default connectToDB
