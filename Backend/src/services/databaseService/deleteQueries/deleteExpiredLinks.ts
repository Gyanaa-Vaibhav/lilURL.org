import {DeleteInterface} from './deleteExports.js'
import {Database} from "../databaseExports.js";
import {QueryResult} from "pg";
import {logError} from "../../logger/loggerExport.js";

type ToBeDeleted = {
    id?:number,
    linkId?:number,
    shortURL?:string,
}

/**
 * Handles deletion of expired links from the 'expiredlinks' table.
 * Provides methods to delete by ID, linkID, or shortURL.
 */
class DeleteExpiredLinks implements DeleteInterface{
    private db = Database.getInstance('write')

    /**
     * Routes deletion to the appropriate method based on the provided identifier.
     *
     * @param toDelete - Object containing one of `id`, `linkId`, or `shortURL`.
     * @returns A promise resolving to the result of the PostgreSQL DELETE query.
     *
     * @example
     * await deleteExpiredLinkService.query({ linkId: 1 });
     */
    public async query(toDelete:ToBeDeleted): Promise<QueryResult<any>> {
        if(toDelete.id) return await this.byID(toDelete.id)
        if(toDelete.linkId) return await this.byLinkID(toDelete.linkId)
        if(toDelete.shortURL) return await this.byShortURL(toDelete.shortURL)
        logError("Invalid query input for DeleteExpiredLinks")
        throw new Error("Invalid query input for DeleteExpiredLinks");
    }

    /**
     * Deletes a record based on the row's ID.
     * @param id - The primary ID of the expired link entry.
     */
    private async byID(id:number): Promise<QueryResult<any>> {
        const query = `DELETE FROM expiredlinks WHERE id = ($1)`
        const value = [id]
        return await this.db.query(query,value)
    }

    /**
     * Deletes a record based on the associated link ID.
     * @param linkId - The link ID referencing the main links table.
     */
    private async byLinkID(linkId:number): Promise<QueryResult<any>> {
        const query = `DELETE FROM expiredlinks WHERE linkID = ($1)`
        const value = [linkId]
        return await this.db.query(query,value)
    }

    /**
     * Deletes a record based on the short URL string.
     * @param shortURL - The shortened URL string.
     */
    private async byShortURL(shortURL:string):Promise<QueryResult<any>> {
        const query = `DELETE FROM expiredlinks WHERE shortURL = ($1)`
        const value = [shortURL]
        return await this.db.query(query,value)
    }
}

export const deleteExpiredLinkService = new DeleteExpiredLinks()
// await deleteExpiredLinkService.query({linkId:1})