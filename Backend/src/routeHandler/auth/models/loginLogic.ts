import {Request, Response} from 'express';
import {getUserService, hashService, jwtService} from "../../../services/servicesExport.js";

export async function loginLogic(req: Request, res: Response) {
    const email = req.body.email;
    const {rows} = await getUserService.query({email});
    if(rows.length == 0){
        return res.status(401).json({success: false, message: 'No user found.'});
    }
    const password = req.body.password;
    const isValid = await hashService.compareString(password, rows[0].password!);
    if(!isValid){
        return res.status(401).json({success: false, message: 'Email or password invalid.'});
    }

    const userId = rows[0].userid
    const username = rows[0].username

    const accessToken = jwtService.signAccessToken({userId,username,email})
    const refreshToken = jwtService.signRefreshToken({userId,username,email})
    // TODO set secure to true while in development
    res.cookie("refreshToken", refreshToken, {httpOnly:true,secure:false});
    res.json({success: true, accessToken})
}