import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {addUserService, getUserService,jwtService} from "../servicesExport.js";
import {logError} from "../logger/loggerExport.js";
import dotenv from 'dotenv';
dotenv.config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CLIENT_CALLBACK;
const accessToken = process.env.ACCESS_TOKEN

if (!clientID || !clientSecret || !callbackURL) {
    logError("Missing Google OAuth environment variables")
    throw new Error('Missing Google OAuth environment variables');
}

if(!accessToken){
    logError("Missing Access Token in environment")
    throw new Error("Missing Access Token in environment")
}

passport.use(<passport.Strategy>new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL
}, async (assessToken, refreshToken, profile, done) => {
    const { value } = profile?.emails?.[0] ?? {};
    let token;
    if(value){
        const {rows} = await getUserService.query({email:value})
        let userId;

        // TODO need to add refresh Token to cookies
        if(!rows.length){
            const result = await addUserService.query({username:profile.displayName,email:value,oauth_id:profile.id,oauth_provider:"google"})
            userId = result.rows[0]?.userid
        }else{
            userId = rows[0]?.userid
        }

        token = jwtService.signAccessToken({userId,email:value})
    }

    return done(null,token)
}))