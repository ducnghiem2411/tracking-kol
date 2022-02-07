import { csvData } from "../../.."
import { API_KEY } from "../../../config"
import { Fusions } from "../../../mongodb_fusion"

export async function get_fusions_info(root: any, args: any, ctx: any) {
    try {
        const { address, startTime, endTime, apiKey } = args

        if (apiKey !== API_KEY) {
            throw new Error('Invalid api key')
        }

        const foundAddress = csvData.find(a => a.address === address)

        if (!foundAddress) {
            return 'Address not in white list'
        }

        const totalFusionTimes = await Fusions.countDocuments({ owner: address, createdAt: { $gte: startTime, $lte: endTime }  })

        return {
            rangeDate: `${new Date(startTime).toISOString()} -- ${new Date(endTime).toISOString()}`,
            address,
            name: foundAddress.name,
            totalFusionTimes
        }
    } catch (e) {
        throw e
    }
}