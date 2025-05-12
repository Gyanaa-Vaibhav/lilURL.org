import express from "express"
import * as url from "node:url";
import * as path from "node:path";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import {jwtService} from './services/servicesExport.js';
import {analyticsRouter, authRouter, redirectRouter} from './routeHandler/routeHandlerExport.js'
dotenv.config()

const app = express()
const PORT = 5173
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(cors({
    origin:true,
    // methods: ['GET', 'POST'],
    // allowedHeaders: ['Content-Type'],
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {
    console.log(req.user)
    res.send(`Welcome to the root route. Google OAuth callback worked!`);
});
app.get('/refreshToken',jwtService.refreshIncomingToken.bind(jwtService))

app.get("/:shortURL",redirectRouter)
app.use("/auth",authRouter)

app.use( jwtService.verifyToken.bind(jwtService) )

app.use("/analytics", analyticsRouter)
app.get("/a/check-login", (req,res)=>{
    res.json({success:true})
})


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})