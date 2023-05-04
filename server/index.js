import mongoose from 'mongoose'
const config = useRuntimeConfig()

export default async () => {
  const { mongodbUri } = useRuntimeConfig()

  try {
    await mongoose.connect(config.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Connected to MongoDB")
  } catch (e) {
    console.error(e)
  }
}
