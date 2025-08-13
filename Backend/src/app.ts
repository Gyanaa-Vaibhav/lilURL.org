import express from "express"
import * as url from "node:url";
import * as path from "node:path";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import {jwtService, shortenerService} from './services/servicesExport.js';
import {
    analyticsRouter,
    authRouter,
    getRouter,
    redirectRouter,
    updateRouter
} from './routeHandler/routeHandlerExport.js'
dotenv.config()

export const app = express()
const PORT = process.env.PORT || 5173
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(cors({
    origin:true,
    // origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
}))
app.use(express.json({ limit: '1.5mb' }))
app.use(cookieParser())
app.get("/", (req, res) => {
    console.log(req.user)
    res.send(`Welcome to the root route. Google OAuth callback worked!`);
});
app.get('/refreshToken',jwtService.refreshIncomingToken.bind(jwtService))

app.use("/auth",authRouter)
app.post("/free/link",async (req, res) => {
    console.log(req.body)
    const rows = await shortenerService.createLink(req.body.longLink)
    res.json({...rows})
})

// app.use( jwtService.verifyToken.bind(jwtService) )

app.use("/analytics", jwtService.verifyToken.bind(jwtService), analyticsRouter)
app.use('/update', jwtService.verifyToken.bind(jwtService), updateRouter)
app.use('/get', jwtService.verifyToken.bind(jwtService), getRouter)
app.get("/a/check-login", (req,res)=>{
    res.json({success:true})
})

app.get("/:shortURL",redirectRouter)

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})