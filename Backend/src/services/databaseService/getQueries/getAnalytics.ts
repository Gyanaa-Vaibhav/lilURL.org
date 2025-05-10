import {GetInterface} from './getExports.js'
import {Database} from '../databaseExports.js'
import {QueryResult} from "pg";
import {logError} from "../../logger/loggerExport.js";

type QueryInput = { linkID?: number; shortURL?: string; userID?: number; start:string;end:string };
class GetAnalytics implements GetInterface {
    private db = Database.getInstance()

    public async query(input:QueryInput):Promise<QueryResult<any>>{
        console.log(input)
        if(input.userID) return this.byUserId(input.userID,input.start,input.end);
        if(input.linkID) return this.byLinkId(input.linkID);
        if(input.shortURL) return this.byShortURL(input.shortURL);
        logError("Invalid Query for GetAnalytics");
        throw new Error("Invalid Query for GetAnalytics")
    }

    private async byLinkId(id:number):Promise<QueryResult<any>> {
        const value = [id]
        const query = "SELECT * FROM analyticsdata WHERE linkID = ($1)";
        return this.db.query(query, value);
    }

    private async byUserId(id:number,start:string,end:string):Promise<QueryResult<any>> {
        const value = [id,start,end];
        const query = "SELECT * FROM analyticsdata WHERE userID = ($1) AND time BETWEEN ($2) AND ($3)";
        return this.db.query(query, value);
    }

    private async byShortURL(shortURL:string):Promise<QueryResult<any>> {
        const value = [shortURL]
        const query = "SELECT * FROM analyticsdata WHERE shortURL = ($1)";
        return this.db.query(query, value);
    }
}
export const getAnalyticsService = new GetAnalytics()