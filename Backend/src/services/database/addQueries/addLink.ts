import {AddInterface} from './addExports.js'
import {PostgresDB} from '../databaseExports.js'
import {QueryResult} from "pg";

type linkType = {
    userId?:string,
    LongLink:string,
    shortLink:string,
}

export class AddLink implements AddInterface{
    private db = PostgresDB.getInstance()
    /**
     * Inserts a new shortened link into the database.
     *
     * @param {Object} params - The link data to insert.
     * @param {string} params.userId - The ID of the user creating the link.
     * @param {string} params.LongLink - The original long URL to shorten.
     * @param {string} params.shortLink - The generated short URL code.
     * @returns {Promise<QueryResult>} A promise resolving to the result of the insert query.
     *
     * @example
     * const data = {
     *   userId: "1",
     *   LongLink: "https://example.com",
     *   shortLink: "abc123"
     * };
     * const result = await AddLink.query(data);
     */
    public async query({userId,LongLink,shortLink}:linkType):Promise<QueryResult> {
        const values = [LongLink, shortLink, userId, new Date()]
        const query =`
            INSERT INTO 
                links(longURL,shortURL,userid,createdAT) 
            VALUES 
                ($1,$2,$3,$4)
        `
        return await this.db.query(query, values)
    }
}