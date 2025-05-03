import {UpdateInterface} from './updateExports.js'
import {Database} from '../databaseExports.js'
import {QueryResult} from "pg";

type UpdateProperties = 'linkID' | 'longURL' | 'shortURL' | 'expiresAT'
type Set = {
    where: UpdateProperties,
    as: string
}

type Where = {
    where: UpdateProperties,
    to: string
}

/**
 * Handles dynamic updates to fields in the 'links' table of the database.
 */
class UpdateLink implements UpdateInterface{
    private db = Database.getInstance()

    /**
     * Updates a specific column in the 'links' table where a condition is matched.
     *
     * @param set - Object containing the column to update (`where`) and its new value (`to`).
     * @param where - Object containing the condition column (`where`) and the expected match value (`is`).
     * @returns A Promise resolving to the result of the PostgreSQL query.
     *
     * @example
     * await updateService.query(
     *   { where: 'longURL', to: 'https://newsite.com' },
     *   { where: 'linkID', is: '42' }
     * );
     */
    public async query(set:Set, where:Where): Promise<QueryResult<any>>{
        const query = `UPDATE links SET ${set.where} = $1 WHERE ${where.where} = $2`
        const values = [set.as, where.to];
        return this.db.query(query,values)
    }
}

export const updateLinkService = new UpdateLink()