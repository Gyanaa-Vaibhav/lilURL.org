import {GetInterface} from './getExports.js'
import {Database} from '../databaseExports.js'
import {QueryResult} from "pg";
import {logError} from "../../logger/loggerExport.js";

type QueryInput = { shortLink?: string; longURL?: string; id?: number };
class GetLink implements GetInterface{
    private db = Database.getInstance()
    /**
     * Dynamically resolves a fetch strategy based on the provided input key.
     * Delegates the query to one of the dedicated methods: byShortURL, byLongURL, or byID.
     *
     * @param {Object} input - Query input with one of: shortLink, longURL, or id.
     * @returns {Promise<QueryResult>} The result of the corresponding lookup.
     *
     * @throws {Error} If no valid input type is provided.
     *
     * @example
     * await getLink.query({ shortLink: "abc123" });
     * await getLink.query({ longURL: "https://example.com" });
     * await getLink.query({ id: 42 });
     */
    public async query(input:QueryInput):Promise<QueryResult> {
        if (input.shortLink) return this.byShortURL(input.shortLink);
        if (input.longURL) return this.byLongURL(input.longURL);
        if (input.id) return this.byID(input.id);
        logError("Invalid query input for GetLink")
        throw new Error("Invalid query input for GetLink");
    }

    /**
     * Fetches a link record by its unique link ID.
     *
     * @param {number} id - The primary key (linkID) of the link.
     * @returns {Promise<QueryResult>} The result containing the matching link row, if found.
     */
    private async byID(id:number):Promise<QueryResult> {
        const value = [id]
        const query =`
            SELECT * FROM links
            WHERE linkID = ($1)
        `
        return await this.db.query(query,value)
    }

    /**
     * Fetches a link record by its original long URL.
     *
     * @param {string} longURL - The full/original URL to look up.
     * @returns {Promise<QueryResult>} The result containing the matching link row, if found.
     */
    private async byLongURL(longURL:string):Promise<QueryResult> {
        const value = [longURL]
        const query =`
            SELECT * FROM links
            WHERE longurl = ($1)
        `
        return await this.db.query(query,value)
    }

    /**
     * Fetches a link record by its short URL.
     *
     * @param {string} shortURL - The shortened URL code to look up.
     * @returns {Promise<QueryResult>} The result containing the matching link row, if found.
     */
    private async byShortURL(shortURL:string):Promise<QueryResult> {
        const value = [shortURL]
        const query = `
            SELECT * FROM links
            WHERE shorturl = ($1)
        `
        return await this.db.query(query,value)
    }

    /**
     * Retrieves the most recently inserted link record from the database.
     *
     * @returns {Promise<QueryResult>} The result containing the latest link row (highest linkID).
     *
     * @example
     * const { rows } = await getLink.lastIndex();
     * console.log(rows[0]); // Latest link entry
     */
    public async lastIndex(): Promise<QueryResult>{
        const query = "SELECT * FROM links ORDER BY linkID DESC LIMIT 1;"
        return await this.db.query(query)
    }
}

export const getLinkService = new GetLink();
