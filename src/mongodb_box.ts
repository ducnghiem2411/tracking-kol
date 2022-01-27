import { MongoClient, Collection } from 'mongodb'
import { Box } from './models/Box'
import { Reward } from './models/Reward'
import { ScanBoxUser } from './models/ScanBoxUser'

let mongodbBox: MongoClient

export let Boxes: Collection<Box>
export let Rewards: Collection<Reward>
export let ScanBoxUsers: Collection<ScanBoxUser>

const collections = {
    boxes: 'boxes',
    rewards: 'rewards',
    scan_box_users: 'scan_box_users',
}

const connectMongoBox = async (MONGO_URI: string) => {
    try {        
        mongodbBox = new MongoClient(MONGO_URI)

        await mongodbBox.connect()

        mongodbBox.on('error', async (e) => {
            try {
                await mongodbBox.close()
                await connectMongoBox(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongoBox, 1000)
                throw e
            }
        })

        mongodbBox.on('timeout', async () => {
            try {
                await mongodbBox.close()
                await connectMongoBox(MONGO_URI)
            } catch (e) {
                setTimeout(connectMongoBox, 1000)
                throw e
            }
        })

        mongodbBox.on('close', async () => {
            try {
                await connectMongoBox(MONGO_URI)
            } catch (e) {
                throw e
            }
        })
        const db = mongodbBox.db()

        Boxes = db.collection(collections.boxes)
        Rewards = db.collection(collections.rewards)
        ScanBoxUsers = db.collection(collections.scan_box_users)
        
        console.log(`🚀 Mongodb box: connected`)
    } catch (e) {
        console.error(`Mongodb box: disconnected`)
        await mongodbBox?.close(true)
        setTimeout(connectMongoBox, 1000)
        throw e
    }
}

export { mongodbBox, connectMongoBox, collections }


