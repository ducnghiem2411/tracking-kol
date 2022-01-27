import { IndexDescription } from "mongodb";
import { TransactionError } from "./common";

export interface Forging {
    txid: string;
    blockNumber: number;
    result: boolean;
    timestamp: number;
}

export interface Fusion {
    owner: string
    runeId: number
    option: string []
    key: string
    createdAt: number
    blockNumber: number
    isForging: boolean
    txid: string
    forging_info?: Forging
    status?: 'success' | 'processing' | 'failed' | 'paying' | 'paid'
    result?: boolean
    blockHash?: string
    error?: TransactionError
}

export const FusionIndexes: IndexDescription[] = [
    { key: { key: 1 }, unique: true },
    { key: { runeId: 1 } },
    { key: { createdAt: 1 } },
    { key: { blockNumber: 1 } },
    { key: { txid: 1 }, unique: true},
]