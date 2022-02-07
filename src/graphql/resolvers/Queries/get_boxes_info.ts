import { csvData } from "../../.."
import { API_KEY } from "../../../config"
import { Boxes, Rewards, ScanBoxUsers } from "../../../mongodb_box"

export async function get_boxes_info(root: any, args: any, ctx: any) {
    try {
        const { address, startTime, endTime, apiKey } = args

        if (apiKey !== API_KEY) {
            throw new Error('Invalid api key')
        }

        const foundAddress = csvData.find(a => a.address === address)

        if (!foundAddress) {
            return 'Address not in white list'
        }

        const scanBox = await ScanBoxUsers.find({ ownerAddress: address, scanedAt: { $gte: startTime, $lte: endTime } }).toArray()

        if (!scanBox.length) {
            return `Data at date range ${new Date(startTime)} - ${new Date(endTime)} not found`
        }
        
        let rewards: any[] = []
        
        const totalBoxClaimed = await Boxes.find({ ownerAddress: address, createdAt: { $gte: startTime, $lte: endTime } }).toArray()

        const totalBoxesId = totalBoxClaimed.map(function (b) {
            return b.tokenId
        })
        
        const allRewards = await Rewards.find({ tokenId: { $in: totalBoxesId } }).toArray()

        allRewards.forEach(function (r) {
            rewards = rewards.concat(r.unboxResults)
        })

        return {
            date: `${new Date(startTime).toISOString()} - ${new Date(endTime).toISOString()}`,
            address,
            name: foundAddress.name,
            totalBoxClaimed: totalBoxClaimed.length,
            unboxTimes: allRewards.length,
            unboxReward: rewards
        }
    } catch (e) {
        throw e
    }
}