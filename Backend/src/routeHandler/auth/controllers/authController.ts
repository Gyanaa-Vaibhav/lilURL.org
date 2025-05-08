// Controller for auth
import passport from "passport";

export const renderGoogleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const handelGoogleCallback = passport.authenticate('google', {session:false});
