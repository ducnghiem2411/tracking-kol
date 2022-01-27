import { IndexDescription } from "mongodb";
import { TransactionError } from "./common";

export interface UnboxResult {
    box_name: string
    n1: number
    n1_rune: string
    n2: number
    n2_rune: string
    n3: number
    n3_rune: string
}

export interface Reward {
    tokenId: number
    typeBox?: number
    isReward: boolean
    unboxedAt: number
    unboxResults: UnboxResult
    bot_index?: number
    txid?: string
    rewardAt?: number
    blockNumber?: number
    reward_to_owner?: string
    error?: TransactionError
}

export const RewardIndexes: IndexDescription[] = [
    { key: { tokenId: 1 }, unique: true },
    { key: { typeBox: 1 } },
    { key: { unboxedAt: 1 }, },
]