import {AddInterface} from './addExports.js'
import {PostgresDB} from '../databaseExports.js'

export class AddLink implements AddInterface{
    public static async query({LongLink,shortLink}: any) {
        const db = PostgresDB.getInstance()
        const values = [LongLink, shortLink]
        const query =`
            
        `
        await db.query(query, values)
    }
}