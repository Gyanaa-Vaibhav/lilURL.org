import {Request, Response} from 'express';
import {getUserService,hashService} from "../../../services/servicesExport.js";

export async function loginLogic(req: Request, res: Response) {
    const email = req.body.email;
    const {rows} = await getUserService.query({email});
    if(rows.length == 0){
        return res.status(401).json({success: false, message: 'No user found.'});
    }
    const password = req.body.password;
    const hashedPassword = await hashService.hashString(password);
    const isValid = await hashService.compareString(email, hashedPassword);
    if(!isValid){
        return res.status(401).json({success: false, message: 'Email or password invalid.'});
    }

    res.json({success:true,userData: {userId:rows[0].userid,username:rows[0].username}});
}