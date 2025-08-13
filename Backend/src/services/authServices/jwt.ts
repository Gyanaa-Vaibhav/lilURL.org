/**
 * @file jwt.ts
 * @description JWT service class for signing, verifying, decoding, and refreshing tokens in an Express.js application.
 */
import jwt, {JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';
import {NextFunction,Response,Request} from "express";
import {logError, logWarn} from "../servicesExport.js"
dotenv.config();
export interface JwtPayloadCustom { userId: number; username: string; email: string }
/**
 * Handles JWT operations including signing, verification, decoding, and token refreshing.
 * Utilizes environment variables for access and refresh token secrets.
 */
class JWTValidator{
    private accessToken = process.env.ACCESS_TOKEN
    private refreshToken = process.env.REFRESH_TOKEN

    constructor() {
        if(!this.accessToken || !this.refreshToken){
            logError("Please add accessToken and refreshToken in Environment Variables")
        }
    }

    /**
     * Signs a new access token using the access token secret.
     * @param {any} payload - Data to encode in the token.
     * @param {string} [expiry] - Optional custom expiration time.
     * @returns {string} - Signed JWT access token.
     */
    public signAccessToken(payload:any, expiry?:any): string{
        if(expiry) return jwt.sign(payload,this.accessToken!, {expiresIn: expiry})
        return jwt.sign(payload,this.accessToken!, {expiresIn:'6hr'})
    }

    /**
     * Signs a new refresh token using the refresh token secret.
     * @param {any} payload - Data to encode in the token.
     * @returns {string} - Signed JWT refresh token.
     */
    public signRefreshToken(payload:any): string{
        return jwt.sign(payload,this.refreshToken!, {expiresIn:'7d'})
    }

    /**
     * Verifies and decodes an access token.
     * @param {string} token - The JWT access token.
     * @returns {JwtPayload|string|undefined} - Decoded payload or undefined if invalid.
     */
    public decodeAccessToken(token:string):JwtPayload | string | undefined {
        const verified = jwt.verify(token, this.accessToken!);
        const decode = jwt.decode(token);
        if (!decode) return;
        return verified;
    }

    /**
     * Verifies and decodes a refresh token.
     * @param {string} token - The JWT refresh token.
     * @returns {JwtPayload|string|undefined} - Decoded payload or undefined if invalid.
     */
    public decodeRefreshToken(token:any):JwtPayload | string | undefined {
        const verified = jwt.verify(token, this.refreshToken!);
        const decode = jwt.decode(token);
        if (!decode) return;
        return verified;
    }

    /**
     * Express middleware to verify the access token from the Authorization header.
     * Sets the decoded user data to req.user if valid.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     */
    public verifyToken(req:Request, res:Response, next:NextFunction) {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            logWarn('Authorization header is missing');
            res.status(401).json({
                success: false,
                error: 'Authorization token missing or malformed',
            });
            return;
        }
        const token = authHeader.split(' ')[1];
        try {
            const accessKey = this.accessToken;
            if (!accessKey){
                logError("Access Key not found")
                throw new Error("Access Key not found")
            }
            req.user = this.decodeAccessToken(token);
            next();
        }
        catch (err:any) {
            logError(err)
            if (err.name === 'TokenExpiredError') {
                res.status(401).json({
                    success: false,
                    error: 'Token has expired',
                });
                return;
            }
            res.status(401).json({
                success: false,
                error: 'Invalid token',
            });
            return;
        }
    }

    /**
     * Handles refresh token logic. Generates a new access token if refresh token is valid.
     * Sends the new token in the response.
     * @param {Request} req - Express request object with cookies.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     */
    public refreshIncomingToken(req:Request, res:Response, next:NextFunction) {
        try {
            const accessKey = this.accessToken;
            const refreshKey = this.refreshToken;
            if (!accessKey || !refreshKey){
                logError("Access Key or Refresh Key not found")
                return;
            }
            const token = req.cookies.refreshToken;
            if (!token) {
                res.status(401).json({ success: false, error: 'Refresh token is missing' });
                return;
            }
            const user = this.decodeRefreshToken(token);
            const payload = {
                // @ts-ignore
                user_id: user.userid,
                // @ts-ignore
                username: user.username,
            };
            const newAccessToken = jwt.sign(payload, accessKey, { expiresIn: '6h' });
            console.log(newAccessToken);
            req.user = user;
            res.status(200).json({ success: true, accessToken: newAccessToken });
            return;
        }
        catch (error) {
            next(error);
        }
    }
}

export const jwtService = new JWTValidator()