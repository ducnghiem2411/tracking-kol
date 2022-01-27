import { config_END_TIME_EVENT, config_INTERVAL_SET_TIME_KEY, config_START_TIME_EVENT } from "../../../config"
import { ErrMsg, ERROR_CODE, validateMissing } from "../../../error_handler"
import { mongodbFusion, Scan_Box_Users } from "../../../mongodb_fusion"
import { generateUserTimeKey } from "../../../utils"

export const pr_box_user_claim_box_testnet = async (root: any, args: any, ctx: any) => {
    const session = mongodbFusion.startSession()
    try {
        const { address } = args as { address: string }

        validateMissing({ address })

        const timestamp = new Date().getTime()

        if (timestamp < config_START_TIME_EVENT) throw ErrMsg(ERROR_CODE.EVENT_NOT_START)
        if (timestamp >= config_END_TIME_EVENT) throw ErrMsg(ERROR_CODE.EVENT_HAS_ENDED)

        const get_time_key = generateUserTimeKey()

        const user_key = `${address}_${get_time_key}`
        let result: number[] | undefined = undefined
        await session.withTransaction(async () => {
            const getData = await Scan_Box_Users.findOne({ ownerAddress: address, time_key: get_time_key }, { session })
            if (!getData) throw ErrMsg(ERROR_CODE.USER_NOT_ON_THE_REWARD)
            if (getData.isClaim) throw ErrMsg(ERROR_CODE.USER_HAS_CLAIMED)
            const update_document = await Scan_Box_Users.findOneAndUpdate(
                { ownerAddress: address, time_key: get_time_key },
                { $set: { isClaim: true, claimedAt: +new Date(), user_key } },
                { session, returnDocument: 'after' }
            )
            const { value } = update_document
            result = value?.box_testnet_claim
        })
        if (result === undefined) return null
        return result
    } catch (e) {
        if (session.inTransaction()) await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
}
