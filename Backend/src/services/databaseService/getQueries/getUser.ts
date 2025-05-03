import {GetInterface} from './getExports.js'
import {Database} from '../databaseExports.js'

//TODO Need to assign type for user Object
class GetUser implements GetInterface{
    public async query({email}:{email:string}){
        const db = Database.getInstance()
        const value = [email]
        return await db.query("",value)
    }
}

export const getUserService = new GetUser()