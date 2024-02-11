import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default connectToDB
