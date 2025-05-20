// Controller for update
import { Request, Response } from 'express';
import {updateUsersService} from "../../../services/databaseService/databaseExports.js";

export const renderUpdate = (req:Request, res:Response) => {
    res.send('Render update page here');
};

export async function updateQR(req:Request, res:Response){
    //@ts-ignore
    await updateUsersService.query({where:'qr_options' ,to:req?.body?.qrOptions},{where:"userID", is:req?.user?.userId as string})
    res.json({success:true,message:'QR options updated successfully.'});
}
