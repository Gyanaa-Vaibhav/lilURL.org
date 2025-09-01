import {GetInterface} from './getExports.js'
import {Database} from '../databaseExports.js'
import {QueryResult} from "pg";

class GetExpiredLinks implements GetInterface{
    private db = Database.getInstance('read')

    public async query():Promise<QueryResult> {
        return await this.db.query("SELECT * FROM expiredlinks")
    }

    public async getFirstID():Promise<{ id:number,shortURL:string } | undefined > {
        const query = "SELECT * FROM expiredlinks;"
        const {rows} = await this.db.query(query)
        return {id:rows[0]?.linkid,shortURL:rows[0]?.shorturl}
    }
}

export const getExpiredLinksService = new GetExpiredLinks()
// const rows = await getexpiredlinks.getFirstID()
// console.log(rows)