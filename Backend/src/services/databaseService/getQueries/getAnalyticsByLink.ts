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
            SELECT devicetype, COUNT(*) AS count
            FROM (
                     SELECT
                         CASE
                             WHEN isBot = true THEN 'Bot'
                             WHEN deviceType ILIKE '%mobile%' THEN 'Mobile'
                             WHEN deviceType ILIKE '%tablet%' THEN 'Tablet'
                             WHEN deviceType ILIKE '%tv%' THEN 'TV'
                             WHEN deviceType ILIKE '%desktop%' OR deviceType ILIKE '%pc%' THEN 'Desktop'
                             ELSE 'Others'
                             END AS devicetype
                     FROM analyticsdata
                     WHERE linkID = $1 AND time BETWEEN $2 AND $3
                 ) AS sub
            GROUP BY devicetype;
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
            SELECT
                CASE
                    WHEN os ILIKE 'Android' THEN 'Android'
                    WHEN os ILIKE 'iOS' THEN 'iOS'
                    WHEN os ILIKE 'MacOS' THEN 'MacOS'
                    WHEN os ILIKE 'Windows' THEN 'Windows'
                    WHEN os ILIKE 'Linux' THEN 'Linux'
                    ELSE 'Others'
                    END AS os,
                COUNT(*) AS count
            FROM analyticsdata
            WHERE linkID = $1 AND time BETWEEN $2 AND $3
            GROUP BY os;
        `
        return this.db.query(query, value);
    }

    private async byClickHour(id:number,start:string,end:string){
        const value = [id,start,end];
        const query = `
            SELECT DATE_TRUNC('hour', time) AS id, COUNT(*) AS value
            FROM analyticsdata
            WHERE linkID = $1 AND time BETWEEN $2 AND $3
            GROUP BY id
            HAVING COUNT(*) > 0
            ORDER BY id;
--             WITH hours AS (
--                 SELECT generate_series(
--                                date_trunc('hour', $2::timestamp),
--                                date_trunc('hour', $3::timestamp),
--                                interval '1 hour'
--                        ) AS id
--             )
--             SELECT
--                 h.id,
--                 COALESCE(COUNT(a.*), 0) AS value
--             FROM hours h
--                      LEFT JOIN analyticsdata a
--                                ON date_trunc('hour', a.time) = h.id
--                                    AND a.linkID = $1
--             GROUP BY h.id
--             ORDER BY h.id;
        `
        return this.db.query(query, value);
    }
}

export const getAnalyticsByLinkService = new GetAnalyticsByLink();
// const start = '2025-05-03T00:00:00.000Z';
// const end = '2025-05-09T23:59:59.999Z';
// const {rows} = await getAnalyticsByLinkService.query({clicksHour:1,start,end})
// console.log(rows)