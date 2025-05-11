import {Request,Response} from "express";
import {addUserService, getUserService, hashService, jwtService} from "../../../services/servicesExport.js";

export async function registerLogic(req:Request, res:Response){
    const email = req.body.email;
    const {rows} = await getUserService.query({email});
    const username = email.match(/^[^@]+/);

    if(rows.length){
        return res.status(409).json({success: false, message: 'Account already exists, Please Log-in'});
    }

    const password = req.body.password;
    const hashedPassword = await hashService.hashString(password);

    // const {rows} = await addUserService.query({username:username[0],email,password:hashedPassword})

}