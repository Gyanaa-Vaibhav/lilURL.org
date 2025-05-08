import {Router} from 'express';
import {handelGoogleCallback, renderGoogleAuth} from '../controllers/authController.js';

export const authRouter = Router();

// Default route to render the auth page
authRouter.get('/google', renderGoogleAuth);
authRouter.get('/google/callback',handelGoogleCallback,(req,res)=>{
    res.redirect(`/oauth-success?token=${req.user}`)
});
