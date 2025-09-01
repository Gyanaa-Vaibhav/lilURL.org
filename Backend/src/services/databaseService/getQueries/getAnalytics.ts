/**
 * @file getAnalytics.ts
 * @description Service for retrieving analytics data from the database based on user ID, link ID, or short URL.
 * Supports filtering by date range when querying by user ID.
 */
import {GetInterface} from './getExports.js'
import {Database} from '../databaseExports.js'
import {QueryResult} from "pg";
import {logError} from "../../logger/loggerExport.js";

/**
 * @typedef {Object} QueryInput
 * @property {number} [linkID] - The ID of the link for which analytics is requested.
 * @property {string} [shortURL] - The short URL identifier.
 * @property {number} [userID] - The user ID to filter analytics data.
 * @property {string} start - The start date (ISO format) for filtering by time.
 * @property {string} end - The end date (ISO format) for filtering by time.
 */
type QueryInput = { linkID?: number; shortURL?: string; userID?: number; start:string;end:string };

/**
 * Class representing analytics data retrieval service.
 * Implements the GetInterface to provide query execution for different analytics views.
 */
class GetAnalytics implements GetInterface {
    private db = Database.getInstance('read')

    /**
     * Main query dispatcher that routes to appropriate analytics fetch method.
     * @param {QueryInput} input - Input query parameters.
     * @returns {Promise<QueryResult<any>>} - Result from the analytics query.
     * @throws {Error} If input is invalid or no matching handler is found.
     */
    public async query(input:QueryInput):Promise<QueryResult<any>>{
        if(input.userID && input.start && input.end) return this.byUserId(input.userID,input.start,input.end);
        if(input.linkID) return this.byLinkId(input.linkID);
        if(input.shortURL) return this.byShortURL(input.shortURL);
        logError("Invalid Query for GetAnalytics");
        throw new Error("Invalid Query for GetAnalytics")
    }

    /**
     * Fetch analytics based on a specific link ID.
     * @param {number} id - The link ID.
     * @returns {Promise<QueryResult<any>>} - Analytics data for the link.
     */
    private async byLinkId(id:number):Promise<QueryResult<any>> {
        const value = [id]
        const query = "SELECT * FROM analyticsdata WHERE linkID = ($1)";
        return this.db.query(query, value);
    }

    /**
     * Fetch analytics for a user within a specific time range.
     * @param {number} id - The user ID.
     * @param {string} start - Start date (ISO format).
     * @param {string} end - End date (ISO format).
     * @returns {Promise<QueryResult<any>>} - Analytics data for the user within the time range.
     */
    private async byUserId(id:number,start:string,end:string):Promise<QueryResult<any>> {
        const value = [id,start,end];
        const query = "SELECT * FROM analyticsdata WHERE userID = ($1) AND time BETWEEN ($2) AND ($3)";
        return this.db.query(query, value);
    }

    /**
     * Fetch analytics using the short URL identifier.
     * @param {string} shortURL - The short URL to look up.
     * @returns {Promise<QueryResult<any>>} - Analytics data for the short URL.
     */
    private async byShortURL(shortURL:string):Promise<QueryResult<any>> {
        const value = [shortURL]
        const query = "SELECT * FROM analyticsdata WHERE shortURL = ($1)";
        return this.db.query(query, value);
    }
}
export const getAnalyticsService = new GetAnalytics()