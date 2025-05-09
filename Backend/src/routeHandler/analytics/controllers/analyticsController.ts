// Controller for analytics
import { Request, Response } from 'express';
import {getAnalyticsService} from "../../../services/servicesExport.js";

export const renderAnalytics = async (req:Request,res:Response)=>{
    const linkId = req.params.linkId
    console.log(linkId)
    const {rows} = await getAnalyticsService.query({linkID:Number(linkId)})
    res.json({success:true,linkId,data:rows})
}