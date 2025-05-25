// @ts-nocheck
// Controller for get
import { Request, Response } from 'express';
import {getLinkService, getUserService} from "../../../services/databaseService/databaseExports.js";
export const renderGet = (req:Request, res:Response) => {
    res.send('Render get page here');
};

export async function getQrOptions(req:Request, res:Response){
    const {rows} = await getUserService.query({qr:req?.user?.userId as number})
    res.json({success:true,qr_options:rows[0]?.qr_options});
}

export async function getUserDetails(req:Request, res:Response){
    const userId = req?.user?.userId as number
    const {rows} = await getUserService.query({userID:userId})
    const linkData = await getLinkService.query({userId})
    const userData = {
        username: rows[0].username,
        email: rows[0].email,
        createdAt: rows[0].createdat,
    }
    res.json({success:true, userData, linkData:linkData.rows})
}

export async function getOrCreateLink(req:Request, res:Response){

}
