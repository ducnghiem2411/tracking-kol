import { IndexDescription, ObjectId } from "mongodb"

export interface Box {
    _id?: ObjectId
    tokenId: number
    quantity?: number
    currency?: string
    ownerAddress: string
    buyBox_txid: string
    buyBox_blockNumber: number
    unbox_txid?: string
    unbox_blockNumber?: number
    nftType: string
    typeBox?: number
    isBidding: boolean
    createdAt: number
    lastUpdatedAt: number
    unbox: boolean
    unboxAt?: number
    status?: 'processing' | 'rewarding' | 'opened'
}

export const BoxIndexes: IndexDescription[] = [
    { key: { tokenId: 1 }, unique: true },
    { key: { txid: 1 } },
    { key: { owner: 1 } },
    { key: { createdAt: 1 } },
    { key: { lastUpdatedAt: 1 } },
    { key: { isBidding: 1 } },
    { key: { blockNumber: 1 } },
    { key: { typeBox: 1 } },
    { key: { runeAmount: 1 } },
    { key: { nftName: 1 } },
    { key: { unbox: 1 } },
    { key: { unboxAt: 1 } },
    { key: { nftType: 1 } },
    { key: { "unboxDetails.totalRune": 1 } },
]
