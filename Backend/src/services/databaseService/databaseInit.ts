import {Pool} from "pg";
const host = process.env.DB_HOSTNAME_WRITE
const password = process.env.DB_PASSWORD
const user = process.env.DB_USER;
const port = Number(process.env.DB_PORT)
const database = process.env.DB_NAME;

const pool = new Pool({
    host: host,
    password: password,
    user: user,
    port: port,
    database: database,
})

const db = pool
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
        userID INT REFERENCES users (userID) ON DELETE CASCADE,
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
        linkID INT REFERENCES links(linkID) ON DELETE CASCADE,
        shortURL VARCHAR(20)
    )
`;
const expiredLinksInitResult = await db.query(expiredLinksQuery)
console.log(expiredLinksInitResult)


const analyticsQuery = `
    CREATE TABLE IF NOT EXISTS analyticsdata(
        id         SERIAL PRIMARY KEY,
        linkID     INT REFERENCES links (linkID) ON DELETE CASCADE,
        userID     INT REFERENCES users (userID) ON DELETE CASCADE,
        referrer   VARCHAR(255),
        browser    VARCHAR(100),
        os         VARCHAR(100),
        deviceType VARCHAR(50),
        ip         VARCHAR(45),
        location   VARCHAR(255),
        isBot      BOOLEAN   DEFAULT false,
        qr         BOOLEAN DEFAULT false,
        time       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`
const analyticsQueryResult = await db.query(analyticsQuery)
console.log(analyticsQueryResult)

// const resetLinksQuery = await db.query(`DELETE FROM links;`)
// console.log(resetLinksQuery)

// const deleteQuery = `DELETE FROM users WHERE username = 'test'`
// await db.query(deleteQuery)

const userAddQuery = `
    INSERT INTO users(username, email, password)
    VALUES ($1, $2, $3)
        RETURNING userid, username
`;
const userRows = await db.query(userAddQuery, [
    "test", "test@test.com", "hashed-password"
]);
const userId = userRows.rows[0].userid;

const linkInsertQuery = `
  INSERT INTO links (userid, longurl, shorturl)
  VALUES ($1, $2, $3)
  RETURNING linkid, shorturl
`;
const linkResult = await db.query(linkInsertQuery, [
    userId,
    "https://example.com",
    "exmpl"
]);
const linkId = linkResult.rows[0].linkid;


const analyticsInsert = `
    INSERT INTO analyticsdata (
        linkid, userid, referrer, browser, os, devicetype, ip, location, isbot, time, qr
    ) VALUES
          ($1, $2, 'https://google.com', 'Chrome', 'Windows', 'Desktop', '192.168.1.1', 'Mumbai, India', false, NOW() - interval '5 minutes', false),
          ($1, $2, 'https://facebook.com', 'Firefox', 'macOS', 'Laptop', '192.168.1.2', 'Delhi, India', false, NOW() - interval '1 hour', true),
          ($1, $2, 'https://twitter.com', 'Safari', 'iOS', 'Mobile', '192.168.1.3', 'Bangalore, India', false, NOW() - interval '3 hours', false)
    -- add more rows as needed
`;
const rows = await db.query(analyticsInsert, [linkId, userId]);
console.log(rows)