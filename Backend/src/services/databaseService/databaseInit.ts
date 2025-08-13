import {Pool} from "pg";
const host = process.env.DB_HOSTNAME
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


const analyticsQuery = `
    CREATE TABLE IF NOT EXISTS analyticsdata(
        id         SERIAL PRIMARY KEY,
        linkID     INT REFERENCES links (linkID),
        shortURL   VARCHAR(255) REFERENCES links (shortURL),
        userID     INT REFERENCES users (userID),
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

const deleteQuery = `DELETE FROM users WHERE username = 'test'`
await db.query(deleteQuery)

const userAddQuery =
    ` INSERT INTO
          users(username,email,password)
    VALUES
        ($1,$2,$3)
    RETURNING userID,username
    `
const userRows = await db.query(userAddQuery,["test","test@gmail.com","$2b$10$9MCHxWRn3YYDVlJLVUnCS.ylxpfOtWcYYBvWLw44nEUzEHv3lAXfi"])
console.log(userRows)
const userId = userRows.rows[0].userID



const query = `INSERT INTO analyticsdata (
  linkid, shorturl, userid, referrer, browser, os, devicetype, ip, location, isbot, time, qr
) VALUES
(1, '1', $1, 'https://google.com', 'Chrome', 'Windows', 'Desktop', '192.168.1.1', 'Mumbai, India', false, NOW() - interval '5 minutes', false),
(1, '1', $1, 'https://facebook.com', 'Firefox', 'macOS', 'Laptop', '192.168.1.2', 'Delhi, India', false, NOW() - interval '1 hour', true),
(1, '1', $1, 'https://twitter.com', 'Safari', 'iOS', 'Mobile', '192.168.1.3', 'Bangalore, India', false, NOW() - interval '3 hours', false),
(1, '1', $1, 'https://t.co', 'Edge', 'Windows', 'Desktop', '192.168.1.4', 'Hyderabad, India', false, NOW() - interval '1 day', false),
(1, '1', $1, '', 'Chrome', 'Android', 'Mobile', '10.0.0.1', 'Pune, India', true, NOW() - interval '2 days', false),
(1, '1', $1, 'https://linkedin.com', 'Chrome', 'Linux', 'Laptop', '10.0.0.2', 'Chennai, India', false, NOW() - interval '3 days', false),
(1, '1', $1, '', 'Safari', 'iOS', 'Tablet', '172.16.0.1', 'Ahmedabad, India', false, NOW() - interval '10 minutes', true),
(1, '1', $1, 'https://instagram.com', 'Firefox', 'Windows', 'Desktop', '172.16.0.2', 'Jaipur, India', false, NOW() - interval '20 minutes', false),
(1, '1', $1, '', 'Bot', 'Linux', 'Server', '8.8.8.8', 'USA - Google Bot', true, NOW() - interval '4 hours', false),
(1, '1', $1, '', 'Bot', 'Linux', 'Server', '8.8.4.4', 'Singapore - Bing Bot', true, NOW() - interval '5 hours', false);
`
const rows = await db.query(query,[userId])
console.log(rows)