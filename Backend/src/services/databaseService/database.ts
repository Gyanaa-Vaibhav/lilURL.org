import {Pool} from 'pg';
import dotenv from 'dotenv';
import {logError} from "../logger/loggerExport.js";
dotenv.config()

/**
 * Core Database holder class following the Singleton pattern.
 *
 * - Stores a single database instance, agnostic to the DB engine (PostgreSQL, MongoDB, etc.)
 * - Enforces one-time initialization using `initialiseDB()`
 * - Use `getInstance()` to access the stored DB instance
 *
 * Designed to be extended or wrapped by DB-specific service classes (e.g., PostgresDB, MongoDB).
 */
class Database{
    private static database:unknown;

    /**
     * Returns the initialized database instance.
     * Throws an error if called before initialization.
     */
    public static getInstance() {
        if (!Database.database) {
            logError("Database not initialised please initialise using Database.initialiseDB() method")
            throw new Error("Database not initialised please initialise using Database.initialiseDB() method");
        }
        return Database.database;
    }

    /**
     * Initializes the database instance once.
     * Subsequent calls with a connection will throw an error.
     *
     * @param DBConnection - The DB connection object to store (e.g., Pool, MongoClient)
     */
    public static initialiseDB(DBConnection:unknown){
        if (Database.database && DBConnection) {
            logError("Database already initialised")
            throw new Error("Database already initialised");
        }
        if (!Database.database && DBConnection) {
            Database.database = DBConnection;
        }
    }
}

/**
 * PostgreSQL-specific database accessor.
 *
 * - Wraps the core `Database` singleton.
 * - Casts the instance to `pg.Pool` for type-safe PostgreSQL usage.
 *
 * Extend this pattern to support other databases:
 * e.g., MongoDB class wrapping `MongoClient`, reusing the same `Database` core.
 */
export class PostgresDB{
    /**
     * Returns the database instance as a PostgreSQL Pool.
     */
    public static getInstance(){
        return Database.getInstance() as Pool;
    }
}

const pool = new Pool({
    host: process.env.BD_HOSTNAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
})

Database.initialiseDB(pool)

// Example test
// const db = PostgresDB.getInstance()
// const {rows} = await db.query("Select * FROM users")
// console.log(rows)
