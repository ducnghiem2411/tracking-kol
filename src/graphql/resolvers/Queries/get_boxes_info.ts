import { csvData } from "../../.."
import { API_KEY } from "../../../config"
import { Rewards, ScanBoxUsers } from "../../../mongodb_box"

export async function get_boxes_info(root: any, args: any, ctx: any) {
    try {
        const { address, date, apiKey } = args

        if (apiKey !== API_KEY) {
            throw new Error('Invalid api key')
        }

        const foundAddress = csvData.find(a => a.address === address)

        if (!foundAddress) {
            return 'Address not in white list'
        }

        const scanBox = await ScanBoxUsers.findOne({ ownerAddress: address, date })

        if (!scanBox) {
            return `Data at date ${date} not found`
        }
        
        let rewards: any[] = []

        if (scanBox.isClaim) {
            const allRewards = await Rewards.find({ tokenId: { $in: scanBox.box_testnet_claim } }).toArray()
            rewards = allRewards.map(r => r.unboxResults)
        }

        return {
            date: new Date(scanBox.scanedAt),
            address: scanBox.ownerAddress,
            name: foundAddress.name,
            isClaimed: scanBox.isClaim,
            unboxTimes: rewards.length,
            unboxReward: rewards
        }
    } catch (e) {
        throw e
    }
}