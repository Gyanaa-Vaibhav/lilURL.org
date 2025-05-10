import dayjs from "dayjs";
import {Request, Response} from "express";
import {getAnalyticsByLinkService} from "../../../services/servicesExport.js";

export async function clickAnalytics(req:Request,res:Response){
    const linkId = req.params.linkId;
    const start = req.query.start as string;
    const end = req.query.end as string;
    // const granularity = req.query.granularity as string;
    await getDataByDays(Number(linkId),start,end,res);
    return
}

async function getDataByDays(linkId:number,start:string,end:string,res:Response){
    const {rows} = await getAnalyticsByLinkService.query({clicks:linkId,start,end})
    const totalDays = dayjs(end).diff(dayjs(start), 'day') + 1;

    if (rows.length < 50 && totalDays < 7) {
        return getDataByHour(linkId, start, end, res);
    }
    const rowMap = new Map(
        rows.map((row) => [dayjs(row.day).format('YYYY-MM-DD'), Number(row.count)])
    );

    const allDays: { day: string; count: number }[] = [];
    let current = dayjs(start);
    const last = dayjs(end);

    while (current.isBefore(last) || current.isSame(last, 'day')) {
        const formatted = current.format('YYYY-MM-DD');
        allDays.push({
            day: formatted,
            count: rowMap.get(formatted) ?? 0
        });
        current = current.add(1, 'day');
    }
    res.json({success:true,message:"Click Analytics",data: allDays});
}

async function getDataByHour(linkId:number,start:string,end:string,res:Response){
    const { rows } = await getAnalyticsByLinkService.query({
        clicksHour: linkId,
        start,
        end
    });
    res.json({success: true, message: "Click Analytics", data: rows});
    return
}