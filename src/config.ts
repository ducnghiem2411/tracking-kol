import { config } from "dotenv"

config()

// SERVER CONFIG
if (!process.env.PORT) throw new Error('PORT must be provided')
export const PORT = process.env.PORT

// MONGO CONFIG
if (!process.env.MONGO_BOX_URI) throw new Error('MONGO_BOX_URI must be provided')
export const MONGO_BOX_URI = process.env.MONGO_BOX_URI
if (!process.env.MONGO_FUSION_URI) throw new Error('MONGO_FUSION_URI must be provided')
export const MONGO_FUSION_URI = process.env.MONGO_FUSION_URI

if (!process.env.API_KEY) throw new Error('API_KEY must be provided')
export const API_KEY = process.env.API_KEY