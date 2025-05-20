/**
 * @file getUser.ts
 * @description Service class to fetch user details from the database using email, OAuth ID, or user ID.
 */
import {GetInterface} from './getExports.js'
import {Database} from '../databaseExports.js'
import {logError} from "../../logger/loggerService.js";
import {QueryResult} from "pg";

/**
 * @typedef {Object} QueryInput
 * @property {string} [email] - The user's email address.
 * @property {string} [oAuth] - The user's OAuth ID.
 * @property {number} [userID] - The internal user ID.
 * @property {number as userID} [qr] - The internal user ID to get qrOptions.
 */
type QueryInput = { email?: string; oAuth?: string; userID?: number ; qr?: number};

/**
 * @typedef {Object} UserData
 * @property {number} userid - Unique ID of the user.
 * @property {string} [username] - Username of the user.
 * @property {string} [email] - Email address.
 * @property {string} [password] - Hashed password.
 * @property {string} [oauth_id] - OAuth identifier.
 * @property {string} [oauth_provider] - Provider name (e.g., Google).
 * @property {Date} createdAT - Account creation timestamp.
 */
type UserData = {
    userid: number;
    username?: string;
    email?: string;
    password?: string;
    oauth_id?: string;
    oauth_provider?: string;
    createdAT: Date;
}

/**
 * Class for retrieving user records from the database using different identifiers.
 * Implements GetInterface with routing logic to select the correct query method.
 */
class GetUser implements GetInterface{
    private db = Database.getInstance();

    /**
     * Routes the input to the appropriate query method based on available fields.
     * @param {QueryInput} input - Input parameters for identifying the user.
     * @returns {Promise<QueryResult<UserData>>} - Result of the user query.
     * @throws {Error} If no valid input field is found.
     */
    public async query(input:QueryInput):Promise<QueryResult<UserData>>{
        if(input.email) return this.byEmail(input.email);
        if(input.oAuth) return this.byOAuthId(input.oAuth)
        if(input.userID) return this.byId(input.userID)
        if(input.qr) return this.getQr(input.qr)
        logError("Invalid query input for GetUser")
        throw new Error("Invalid query input for GetLink");
    }

    /**
     * Fetch user data by email.
     * @param {string} email - The user's email.
     * @returns {Promise<QueryResult<UserData>>} - User data matching the email.
     */
    private async byEmail(email:string):Promise<QueryResult<UserData>> {
        const value = [email]
        const query = "SELECT * FROM users WHERE email = ($1)"
        return await this.db.query(query,value)
    }

    /**
     * Fetch user data by OAuth ID.
     * @param {string} oAuth - The OAuth identifier.
     * @returns {Promise<QueryResult<UserData>>} - User data matching the OAuth ID.
     */
    private async byOAuthId(oAuth:string):Promise<QueryResult<UserData>> {
        const value = [oAuth]
        const query = "SELECT * FROM users WHERE oauth_id = ($1)"
        return await this.db.query(query,value)
    }

    /**
     * Fetch user data by internal user ID.
     * @param {number} userID - The user's internal ID.
     * @returns {Promise<QueryResult<UserData>>} - User data matching the user ID.
     */
    private async byId(userID:number):Promise<QueryResult<UserData>> {
        const value = [userID]
        const query = "SELECT * FROM users WHERE userID = ($1)"
        return await this.db.query(query,value)
    }

    private async getQr(userID:number):Promise<QueryResult<UserData>> {
        const value = [userID]
        const query = "SELECT * FROM users WHERE userID = ($1)"
        return await this.db.query(query,value)
    }
}

export const getUserService = new GetUser()
// const a = await getUserService.query({userID:5})
// const b = await getUserService.query({oAuth:"123"})
// const c = await getUserService.query({email:"test@server.com"})
// console.log(a.rows)
// console.log(b.rows)
// console.log(c.rows)