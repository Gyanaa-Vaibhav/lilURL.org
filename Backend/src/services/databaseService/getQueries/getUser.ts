import {GetInterface} from './getExports.js'
import {Database} from '../databaseExports.js'
import {logError} from "../../logger/loggerService.js";
import {QueryResult} from "pg";

type QueryInput = { email?: string; oAuth?: string; userID?: number };
type UserData = {
    userid: number;
    username?: string;
    email?: string;
    password?: string;
    oauth_id?: string;
    oauth_provider?: string;
    createdAT: Date;
}

class GetUser implements GetInterface{
    private db = Database.getInstance();

    public async query(input:QueryInput):Promise<QueryResult<UserData>>{
        if(input.email) return this.byEmail(input.email);
        if(input.oAuth) return this.byOAuthId(input.oAuth)
        if(input.userID) return this.byId(input.userID)
        logError("Invalid query input for GetUser")
        throw new Error("Invalid query input for GetLink");
    }

    private async byEmail(email:string):Promise<QueryResult<UserData>> {
        const value = [email]
        const query = "SELECT * FROM users WHERE email = ($1)"
        return await this.db.query(query,value)
    }

    private async byOAuthId(oAuth:string):Promise<QueryResult<UserData>> {
        const value = [oAuth]
        const query = "SELECT * FROM users WHERE oauth_id = ($1)"
        return await this.db.query(query,value)
    }

    private async byId(userID:number):Promise<QueryResult<UserData>> {
        const value = [userID]
        const query = "SELECT * FROM users WHERE userID = ($1)"
        return await this.db.query(query,value)
    }
}

export const getUserService = new GetUser()
// const a = await getUserService.query({userID:5})
// const b = await getUserService.query({oAuth:"123"})
// const c = await getUserService.query({email:"test@server.com"})
// console.log(a.rows)
// console.log(b.rows)
// console.log(c.rows)