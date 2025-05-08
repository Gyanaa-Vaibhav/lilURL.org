import {Database} from './databaseExports.js'

const db = Database.getInstance()
const userInitQuery =`
    CREATE TABLE IF NOT EXISTS users(
        userID SERIAL PRIMARY KEY,
        username VARCHAR (255),
        email VARCHAR(255),
        password VARCHAR(255),
        oauth_id VARCHAR(120),
        oauth_provider VARCHAR(120),
        createdAT TIMESTAMP DEFAULT NOW()
    )
`;
const userQueryResult = await db.query(userInitQuery)
console.log(userQueryResult)

const linksInitQuery =`
    CREATE TABLE IF NOT EXISTS links(
        linkID SERIAL PRIMARY KEY,
        userID INT REFERENCES users (userID),
        longURL TEXT UNIQUE,
        shortURL VARCHAR(20) UNIQUE,
        createdAT TIMESTAMP DEFAULT NOW(),
        expiresAT TIMESTAMP
    )
`;
const linkQueryResult = await db.query(linksInitQuery)
console.log(linkQueryResult)

const expiredLinksQuery = `
    CREATE TABLE IF NOT EXISTS expiredlinks(
        id SERIAL PRIMARY KEY,
        linkID INT REFERENCES links(linkID),
        shortURL VARCHAR(20)
    )
`;
const expiredLinksInitResult = await db.query(expiredLinksQuery)
console.log(expiredLinksInitResult)