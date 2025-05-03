import {DeleteInterface} from './deleteExports.js'
import {Database} from "../databaseExports.js";
import {QueryResult} from "pg";
import {logError} from "../../logger/loggerExport.js";

type DeleteUserType = {
    username?:string,
    email?:string
}

/**
 * Handles deletion of users from the 'users' table in the database.
 * Supports deletion by userID, username, or email.
 */
class DeleteUser implements DeleteInterface{
    private db = Database.getInstance();

    /**
     * Deletes a user from the 'users' table by email or username.
     *
     * @param toDelete - An object containing either `email` or `username` to identify the user.
     * @returns A Promise resolving to the result of the PostgreSQL DELETE query.
     *
     * @example
     * await deleteUserService.query({ username: "john_doe" });
     * await deleteUserService.query({ email: "john@example.com" });
     */
    async query(toDelete:DeleteUserType): Promise<QueryResult<any>> {
        if(toDelete.email) return await this.byEmail(toDelete.email)
        if(toDelete.username) return await this.byUsername(toDelete.username)
        logError("Invalid query input for DeleteUser")
        throw new Error("Invalid query input for DeleteUser")
    }

    /**
     * Deletes a user from the 'users' table based on their username.
     *
     * @param username - The username of the user to delete.
     * @returns A Promise resolving to the result of the PostgreSQL DELETE query.
     */
    private async byUsername(username:string): Promise<QueryResult<any>> {
        const query = `DELETE FROM users WHERE username = ($1)`
        const value = [username]
        return await this.db.query(query,value)
    }

    /**
     * Deletes a user from the 'users' table based on their email.
     *
     * @param email - The email of the user to delete.
     * @returns A Promise resolving to the result of the PostgreSQL DELETE query.
     */
    private async byEmail(email:string): Promise<QueryResult<any>> {
        const query = `DELETE FROM users WHERE email = ($1)`
        const value = [email]
        return await this.db.query(query,value)
    }
}

export const deleteUserService = new DeleteUser();
await deleteUserService.query({username:"Changed"})
