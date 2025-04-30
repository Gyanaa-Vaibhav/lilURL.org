import express from "express"
import * as url from "node:url";
import dotenv from 'dotenv';
import * as path from "node:path";
dotenv.config()
console.log(process.env.DB_HOSTNAME)
const app = express()
const PORT = 5173
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.get("/",(req,res)=>{
    res.json({a:"a",b:"b"})
})

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})