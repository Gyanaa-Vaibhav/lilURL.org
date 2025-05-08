import express from "express"
import * as url from "node:url";
import * as path from "node:path";
import dotenv from 'dotenv';
import cors from 'cors';
import './services/servicesExport.js';
import {authRouter, redirectRouter} from './routeHandler/routeHandlerExport.js'

dotenv.config()

console.log(process.env.DB_HOSTNAME)
const app = express()
const PORT = 5173
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(cors())

app.get("/", (req, res) => {
    console.log(req.user)
    res.send(`Welcome to the root route. Google OAuth callback worked!`);
});

app.use("/auth",authRouter)
app.get("/login",(req,res)=>{
    res.send("redirected to login")
})

app.get("/:shortURL",redirectRouter)

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})