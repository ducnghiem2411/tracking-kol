import fs from "fs"
const csv = require("csv-parser")

export function getBoxType(input: string) {
    try {
        switch (input) {
            case `gold`:
                return 0
            case `platinum`:
                return 1
            case `diamond`:
                return 2
            default:
                throw new Error(`boxType is invalid`)
        }
    } catch (e) {
        throw e
    }
}

export interface CsvData {
    address: string
    name: string
    totalBox: number
}

export let CSV_RAW_DATA: any[] = []

export const readCSV = async (path: string) => {
    try {
        CSV_RAW_DATA = []
        const result: any[] = await new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv())
                .on("data", (data) => CSV_RAW_DATA.push(data))
                .on("end", () => {
                    resolve(CSV_RAW_DATA)
                })
        })
        return result
    } catch (e) {
        throw e
    }
}
