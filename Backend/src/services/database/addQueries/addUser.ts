import {AddInterface} from './addExports.js'
import {PostgresDB} from '../databaseExports.js'
import {QueryResult} from "pg";
type userData = {
    username:string,
    email:string,
    password:string
}

/**
 * AddUser class handles insertion of new user records into the database.
 * Uses the PostgresDB singleton to execute SQL queries.
 * Implements AddInterface for consistent add operation structure.
 */
export class AddUser implements AddInterface{

    private db = PostgresDB.getInstance();

    /**
     * Inserts a new user into the users table and returns the generated userID.
     *
     * @param {Object} param0 - An object containing the user details.
     * @param {string} param0.username - The username of the new user.
     * @param {string} param0.email - The email address of the new user.
     * @param {string} param0.password - The hashed password of the new user.
     * @returns {Promise<QueryResult<{ userid: string; any: any }>>} A promise that resolves to an array with the inserted userID.
     *
     * @example
     * const data = { username: "john", email: "john@example.com", password: "hashed_pw" };
     * const { rows } = await AddUser.query(data);
     * console.log(rows[0].userID); // New user's ID
     */
    public static async query({username, email, password}: userData): Promise<QueryResult<{ userid: string; any: any }>> {
        const db = PostgresDB.getInstance()
        const values = [username, email, password]
        const query =`
            INSERT INTO 
                users(username,email,password)
            VALUES 
                ($1,$2,$3)
            RETURNING userID
        `;
        return await db.query(query, values)
    }
}

// const data = {username:"test",email:"from@server.com",password:"test456"}
// const { rows } = await AddUser.query(data);
// console.log(rows[0]?.userid)
