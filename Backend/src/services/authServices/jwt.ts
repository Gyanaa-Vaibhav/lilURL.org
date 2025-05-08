import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {NextFunction} from "express";
import {logError} from "../logger/loggerService.js";
import {an} from "vitest/dist/chunks/reporters.d.DG9VKi4m";
dotenv.config();
// function sign(req:Request, res:Response, next:NextFunction) {
//     const token = jwt.sign({ user: 'Bob', userId: 2 }, 'Hello', { expiresIn: '12hr' });
//     let toSend = '';
//     req?.body?.token = token;
//     next();
// }
//
// function decode(req:Request, res:Response, next:NextFunction) {
//     const token = req?.body?.token;
//     const verified = jwt.verify(token, 'Hello');
//     const decode = jwt.decode(token);
//     if (!decode)
//         return;
//     req?.body.user = decode.user;
//     next();
// }
//
// function verifyToken(req:Request, res:Response, next:NextFunction) {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         res.status(401).json({
//             success: false,
//             error: 'Authorization token missing or malformed',
//         });
//         return;
//     }
//     const token = authHeader.split(' ')[1];
//     try {
//         const accessKey = process.env.ACCESS_SECRET;
//         if (!accessKey)
//             return;
//         req.body.user = jwt.verify(token, accessKey);
//         next();
//     }
//     catch (err) {
//         if (err.name === 'TokenExpiredError') {
//             res.status(401).json({
//                 success: false,
//                 error: 'Token has expired',
//             });
//             return;
//         }
//         res.status(401).json({
//             success: false,
//             error: 'Invalid token',
//         });
//         return;
//     }
// }
//
// function refreshToken(req:Request, res:Response, next:NextFunction) {
//     try {
//         const accessKey = process.env.ACCESS_SECRET;
//         const refreshKey = process.env.REFRESH_SECRET;
//         if (!accessKey || !refreshKey)
//             return;
//         console.log('Refreshing token...');
//         const token = req.cookies.refreshToken;
//         console.log(token);
//         if (!token) {
//             res.status(401).json({ success: false, error: 'Refresh token is missing' });
//             return;
//         }
//         const user = jwt.verify(token, refreshKey);
//         const payload = {
//             user_id: user.user_id,
//             username: user.username,
//             email: user.email,
//         };
//         const newAccessToken = jwt.sign(payload, accessKey, { expiresIn: '6h' });
//         console.log(newAccessToken);
//         req.body.user = user;
//         res.status(200).json({ success: true, accessToken: newAccessToken });
//         return;
//     }
//     catch (error) {
//         next(error);
//     }
// }
// // Generate access token (short-lived)
// export function generateAccessToken(payload:any) {
//     const accessKey = process.env.ACCESS_SECRET;
//     if (!accessKey)
//         return;
//     return jwt.sign(payload, accessKey, { expiresIn: '6h' });
// }
// // Generate refresh token (long-lived)
// export function generateRefreshToken(payload:any) {
//     const refreshKey = process.env.REFRESH_SECRET;
//     if (!refreshKey)
//         return;
//     return jwt.sign(payload, refreshKey, { expiresIn: '7d' });
// }
// export { sign, decode, verifyToken, refreshToken };

class JWTValidator{
    private accessToken = process.env.ACCESS_TOKEN
    private refreshToken = process.env.REFRESH_TOKEN

    constructor() {
        if(!this.accessToken || !this.refreshToken){
            logError("Please add accessToken and refreshToken in Environment Variables")
        }
    }

    public signAccessToken(payload:any, expiry?:any){
        if(expiry) return jwt.sign(payload,this.accessToken!, {expiresIn: expiry})
        return jwt.sign(payload,this.accessToken!, {expiresIn:'1hr'})
    }

    public signRefreshToken(payload:any){
        return jwt.sign(payload,this.refreshToken!, {expiresIn:'7d'})
    }

    public decodeAccessToken(token:any){
        const verified = jwt.verify(token, this.accessToken!);
        const decode = jwt.decode(token);
        if (!decode) return;
        return decode;
    }

    public decodeRefreshToken(token:any){
        const verified = jwt.verify(token, this.refreshToken!);
        const decode = jwt.decode(token);
        if (!decode) return;
        return decode;
    }
//     TODO NEED TO ADD VERIFY Middleware and refreshToken Middleware
}

export const jwtService = new JWTValidator()