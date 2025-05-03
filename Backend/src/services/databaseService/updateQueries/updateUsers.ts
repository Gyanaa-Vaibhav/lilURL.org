import {UpdateInterface} from "./updateInterface";
import {QueryResult} from "pg";
import {Database} from '../databaseExports.js'

type UpdateProperties = 'userID' | 'username' | 'email' | 'password'

type Set = {
    where: UpdateProperties,
    to: string
}

type Where = {
    where: UpdateProperties,
    is: string
}

/**
 * Handles dynamic updates to fields in the 'users' table of the database.
 */
class UpdateUsers implements UpdateInterface{
    private db = Database.getInstance()

    /**
     * Updates a specific column in the 'users' table where a condition is matched.
     *
     * @param set - Object specifying which column to update (`where`) and the new value (`to`).
     *              Example: { where: 'username', as: 'NewName' }
     * @param where - Object specifying the condition column (`where`) and the value to match (`is`).
     *                Example: { where: 'userID', is: '123' }
     * @returns A Promise resolving to the result of the PostgreSQL query.
     *
     * @example
     * await updateUsersService.query(
     *   { where: 'username', to: 'Changed' },
     *   { where: 'userID', is: '1' }
     * );
     */
    public async query(set:Set, where:Where): Promise<QueryResult<any>> {
        const query = `UPDATE users SET ${set.where} = $1 WHERE ${where.where} = $2`
        const values = [set.to, where.is];
        return this.db.query(query,values)
    }
}

export const updateUsersService = new UpdateUsers();
await updateUsersService.query({where:'username',to:'Changed'},{where:'userID',is:'1'})