import {GetInterface} from './getExports.js'
import {Database} from '../databaseExports.js'
import {QueryResult} from "pg";
import {logError} from "../../logger/loggerExport.js";

type QueryInput = {
    os?:number,
    device?:number,
    geo?:number,
    clicks?:number,
    clicksHour?:number,
    start:string,
    end:string
};
class GetAnalyticsByLink implements GetInterface {
    private db = Database.getInstance();

    public async query(input:QueryInput): Promise<QueryResult> {
        if(input.device) return this.byDeviceType(input.device,input.start,input.end);
        if(input.os) return this.byOS(input.os,input.start,input.end);
        if(input.geo) return this.byGeo(input.geo,input.start,input.end);
        if(input.clicksHour) return this.byClickHour(input.clicksHour,input.start,input.end);
        if(input.clicks) return this.byClick(input.clicks,input.start,input.end);
        logError("Invalid Query for GetAnalyticsByLink");
        throw new Error("Invalid Query for GetAnalyticsByLink");
    }

    private async byDeviceType(id:number,start:string,end:string){
        const value = [id,start,end]
        const query = `
            SELECT deviceType, COUNT(*) AS count
            FROM analyticsdata
            WHERE linkID = $1 AND time BETWEEN $2 AND $3
            GROUP BY deviceType;
        `
        return this.db.query(query, value);
    }

    private async byGeo(id:number,start:string,end:string){
        const value = [id,start,end]
        const query = `
            SELECT location, COUNT(*) AS count
            FROM analyticsdata
            WHERE linkID = $1 AND time BETWEEN $2 AND $3
            GROUP BY location;
        `
        return this.db.query(query, value);
    }

    private async byClick(id:number,start:string,end:string){
        const value = [id,start,end];
        const query = `
            SELECT DATE(time) AS day, COUNT(*) AS count
            FROM analyticsdata
            WHERE linkID = $1 AND time BETWEEN $2 AND $3
            GROUP BY day
            ORDER BY day;
        `
        return this.db.query(query, value);
    }

    private async byOS(id:number,start:string,end:string){
        const value = [id,start,end];
        const query = `
            SELECT os, COUNT(*) AS count
            FROM analyticsdata
            WHERE linkID = $1 AND time BETWEEN $2 AND $3
            GROUP BY os;
        `
        return this.db.query(query, value);
    }

    private async byClickHour(id:number,start:string,end:string){
        const value = [id,start,end];
        const query = `
            SELECT EXTRACT(HOUR FROM time) AS hour, COUNT(*) AS count
            FROM analyticsdata
            WHERE linkID = $1 AND time BETWEEN $2 AND $3
            GROUP BY hour
            ORDER BY hour;
        `
        return this.db.query(query, value);
    }
}

export const getAnalyticsByLinkService = new GetAnalyticsByLink();
// const start = '2025-04-09T00:00:00.000Z';
// const end = '2025-05-09T23:59:59.999Z';
// const {rows} = await getAnalyticsByLinkService.query({os:1,start,end})
// console.log(rows)