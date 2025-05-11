import {Router} from 'express';
import {handelGoogleCallback, renderGoogleAuth} from '../controllers/authController.js';
import {loginLogic} from "../models/loginLogic.js";
import {registerLogic} from "../models/registerLogic.js";

export const authRouter = Router();

// Default route to render the auth page
authRouter.get('/google', renderGoogleAuth);
authRouter.get('/google/callback',handelGoogleCallback,(req,res)=>{
    res.redirect(`/oauth-success?token=${req.user}`)
});

authRouter.post('/login', async (req, res, next) => {
    try {
        await loginLogic(req, res);
    } catch (error) {
        next(error);
    }
});

authRouter.post('/sign-up', async (req, res, next) => {
    try {
        await registerLogic(req, res);
    }catch (error) {
        next(error);
    }
})
