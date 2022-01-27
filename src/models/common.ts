export interface TransactionError {
    txid: string
    blockNumber: number
    timestamp: number
    status: boolean
    message?: string
}