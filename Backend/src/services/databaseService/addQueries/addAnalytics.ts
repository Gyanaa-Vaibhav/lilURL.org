import {AddInterface} from './addExports.js'
import {Database} from '../databaseExports.js'
import {QueryResult} from "pg";

type AnalyticsInput = {
    linkID: number;
    shortURL: string;
    referrer: string | null;
    browser: string | null;
    os: string | null;
    deviceType: string | null;
    ip: string;
    location: string | null;
    isBot: boolean;
    time?: Date;
}

class AddAnalytics implements AddInterface{
    private db = Database.getInstance();
    public async query(data:AnalyticsInput):Promise<QueryResult>{
        const {linkID, shortURL, referrer, browser, os, deviceType, ip, location, isBot, time} = data;
        const query = `
            INSERT INTO 
                analyticsdata (linkID, shortURL, referrer, browser, os, deviceType, ip, location, isBot, time) 
            VALUES 
                ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        `;

        const values = [
            linkID, shortURL, referrer, browser, os,
            deviceType, ip, location, isBot, time || new Date()
        ];

        return await this.db.query(query,values)
    }
}

export const addAnalyticsService = new AddAnalytics()
// addAnalyticsService.query({
//     linkID: 1,
//     shortURL: "j",
//     referrer: "https://twitter.com",
//     browser: "Chrome",
//     os: "Windows",
//     deviceType: "desktop",
//     ip: "103.21.244.0",
//     location: "New Delhi, India",
//     isBot: false,
// });