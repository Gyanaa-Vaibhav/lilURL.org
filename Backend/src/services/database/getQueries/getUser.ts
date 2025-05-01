import {GetInterface} from './getExports.js'
import {PostgresDB} from '../databaseExports.js'

//TODO Need to assign type for user Object
export class GetUser implements GetInterface{
    public async query({email}:{email:string}){
        const db = PostgresDB.getInstance()
        const value = [email]
        return await db.query("",value)
    }
}