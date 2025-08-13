import {Request, Response} from "express";
import {getAnalyticsByLinkService} from "../../../services/servicesExport.js";

export async function geoAnalytics(req:Request,res:Response) {
    const linkId = req.params.linkId;
    const start = req.query.start as string;
    const end = req.query.end as string;
    const {rows} = await getAnalyticsByLinkService.query({geo:Number(linkId),start,end})
    const formattedData: { location: string; count: number }[] = [];

    for (const row of rows) {
        formattedData.push({
            location: row.location,
            count: Number(row.count),
        });
    }
    res.json({success:true,message:"Geo Analytics",data:formattedData});
}