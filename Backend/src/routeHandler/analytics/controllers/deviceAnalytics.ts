import {Request, Response} from "express";
import {getAnalyticsByLinkService} from "../../../services/servicesExport.js";

export async function deviceAnalytics(req:Request,res:Response){
    const linkId = req.params.linkId;
    const start = req.query.start as string;
    const end = req.query.end as string;
    const {rows} = await getAnalyticsByLinkService.query({device:Number(linkId),start,end})
    const formattedData: { deviceType: string; count: number }[] = [];

    for (const row of rows) {
        formattedData.push({
            deviceType: row.devicetype,
            count: Number(row.count),
        });
    }

    res.json({success:true,message:"Device Analytics",data:formattedData});
}