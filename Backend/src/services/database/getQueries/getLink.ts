import {GetInterface} from './getExports.js'
import {PostgresDB} from '../databaseExports.js'

//TODO Need to assign type for user Object
export class GetLink implements GetInterface{
    public async query({shortLink}:{shortLink:string}){
        const db = PostgresDB.getInstance()
        const value = [shortLink]
        const {rows} = await db.query("",value)
        return rows
    }
}