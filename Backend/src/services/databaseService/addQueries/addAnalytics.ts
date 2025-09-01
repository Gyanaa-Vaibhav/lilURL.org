/**
 * @file addAnalytics.ts
 * @description Adds a new analytics record to the analyticsdata table. Captures metadata such as browser, OS, device, and IP info.
 */
import {AddInterface} from './addExports.js'
import {Database} from '../databaseExports.js'
import {QueryResult} from "pg";

/**
 * @typedef {Object} AnalyticsInput
 * @property {number} linkID - ID of the shortened link.
 * @property {string} shortURL - The short URL identifier.
 * @property {string|null} referrer - Referring source of traffic.
 * @property {string|null} browser - Browser used by the user.
 * @property {string|null} os - Operating system.
 * @property {string|null} deviceType - Type of device (Mobile, Desktop, etc.).
 * @property {string} ip - IP address of the user.
 * @property {string|null} location - Geographic location.
 * @property {boolean} isBot - Whether the request was made by a bot.
 * @property {Date} [time] - Optional timestamp of the event.
 */
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

/**
 * Class responsible for inserting analytics data into the database.
 * Implements AddInterface to ensure query method consistency.
 */
class AddAnalytics implements AddInterface{
    private db = Database.getInstance('write');
    /**
     * Inserts a new record into the analyticsdata table.
     * @param {AnalyticsInput} data - Analytics event details to log.
     * @returns {Promise<QueryResult>} - Result of the database insert operation.
     */
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