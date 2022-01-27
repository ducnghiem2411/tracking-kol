import { IndexDescription } from "mongodb";
export enum TypeUser {
    partner = `partner`,
    user = `user`
}
export interface ScanBoxUser {
    ownerAddress: string
    scanedAt: number
    date: number
    typeUser: TypeUser
    isClaim: boolean
    isMint: boolean
    time_key: number
    user_key?: string
    claimedAt?: number
    mintedAt?: number
    box_mainnet: number[]
    box_testnet_claim: number[]
    mint_txid?: string
    blockNumber?: number
}

export const ScanBoxUserIndexes: IndexDescription[] = [
    { key: { scanedAt: 1 } },
    { key: { date: 1 } },
    { key: { user_key: 1 } },
    { key: { 'box_mainnet.amount': 1 }, },
    { key: { 'box_testnet_claim.amount': 1 }, },
]