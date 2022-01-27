import { MONGO_BOX_URI, MONGO_FUSION_URI } from "./config";
import { initGraphQLServer } from "./graphql";
import { connectMongoFusion } from "./mongodb_fusion";
import { connectMongoBox } from "./mongodb_box";
import { CsvData, CSV_RAW_DATA, readCSV } from "./utils";
const csvPath = './testnet_campaign_update_24-01-2022.csv'

export let csvData: CsvData[]

(async () => {
    try {
        const CSV_DATA = await (await readCSV(csvPath))
            .filter(csv => Number(csv.TOTAL) > 0)
            .map((csv) => { return { address: csv.address, name: csv['\bNAME'], totalBox: csv.TOTAL } })
       
        console.log(CSV_DATA)
        csvData = CSV_DATA
        await connectMongoBox(MONGO_BOX_URI)
        await connectMongoFusion(MONGO_FUSION_URI)
        await initGraphQLServer()
    } catch (e) {
        throw e
    }
})();