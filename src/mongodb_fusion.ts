import { MongoClient, Db, Collection } from 'mongodb'
import { Fusion, FusionIndexes } from './models/Fusion'

let mongodbFusion: MongoClient

export let Fusions: Collection<Fusion>

const collections = {
    fusions: 'fusions',
}

const connectMongoFusion = async (MONGO_URI: string) => {
    try {
        console.log('MONGO_URI', MONGO_URI)
        
        mongodbFusion = new MongoClient(MONGO_URI)

        await mongodbFusion.connect()

        mongodbFusion.on('error', async (e) => {
            try {
                await mongodbFusion.close()
                await connectMongoFusion(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongoFusion, 1000)
                throw e
            }
        })

        mongodbFusion.on('timeout', async () => {
            try {
                await mongodbFusion.close()
                await connectMongoFusion(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongoFusion, 1000)
                throw e
            }
        })

        mongodbFusion.on('close', async () => {
            try {
                await connectMongoFusion(MONGO_URI)
            } catch (e) {
                throw e
            }
        })
        const db = mongodbFusion.db()

        Fusions = db.collection(collections.fusions)
        
        console.log(`🚀 mongodb fusion: connected`)
    } catch (e) {
        console.error(`mongodb fusion: disconnected`)
        await mongodbFusion?.close(true)
        setTimeout(connectMongoFusion, 1000)
        throw e
    }
}

export { mongodbFusion, connectMongoFusion, collections }


