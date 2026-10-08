import dns from 'node:dns'
import mongoose from 'mongoose'

// Em dev, alguns resolvedores locais (ex.: 127.0.0.1 de VPN/roteador) recusam consultas SRV
// e o mongodb+srv:// falha com "querySrv ECONNREFUSED". DNS público resolve.
if (process.env.NODE_ENV !== 'production') dns.setServers(['1.1.1.1', '8.8.8.8'])
const config = useRuntimeConfig()

export default async () => {
  const { mongodbUri } = useRuntimeConfig()

  try {
    // Sem nome de banco na URI o Mongoose cai no banco "test" (vazio); os dados estão em portfolio-api.
    await mongoose.connect(config.connectionString, {
      dbName: process.env.MONGODB_DB || 'portfolio-api'
    })
    console.log(`Connected to MongoDB (db: ${mongoose.connection.name})`)
  } catch (e) {
    console.error(e)
  }
}
