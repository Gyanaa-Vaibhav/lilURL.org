import express from "express"
import * as url from "node:url";
import * as path from "node:path";
import dotenv from 'dotenv';
import cors from 'cors';
import {shortenerService} from "./services/servicesExport.js";
import {redirectRouter} from './routeHandler/routeHandlerExport.js'

dotenv.config()

console.log(process.env.DB_HOSTNAME)
const app = express()
const PORT = 5173
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(cors())

app.get("/",(req,res)=>{
    res.json({a:"a",b:"b"})
})

app.get(/^\/(.*)/,redirectRouter)

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})