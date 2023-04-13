import mongoose from 'mongoose'

export default async () => {
  const { mongodbUri } = useRuntimeConfig()

  try {
    await mongoose.connect('mongodb+srv://felipecss:*b4a52edd*@cluster0.a7id2.mongodb.net/portfolio-api?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Connected to MongoDB")
  } catch (e) {
    console.error(e);
  }
}
