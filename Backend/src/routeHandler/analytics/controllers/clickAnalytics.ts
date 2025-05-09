import dayjs from "dayjs";
import {Request, Response} from "express";
import {getAnalyticsByLinkService} from "../../../services/servicesExport.js";

export async function clickAnalytics(req:Request,res:Response){
    const linkId = req.params.linkId;
    const start = req.query.start as string;
    const end = req.query.end as string;
    const granularity = req.query.granularity as string;
    if(granularity === 'daily'){
        await getDataByDays(Number(linkId),start,end,res);
        return
    }
    if (granularity === 'hourly') {
        await getDataByHour(Number(linkId),start,end,res)
        return
    }
}

async function getDataByDays(linkId:number,start:string,end:string,res:Response){
    const {rows} = await getAnalyticsByLinkService.query({clicks:linkId,start,end})

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
    const diffDays = dayjs(end).diff(dayjs(start), 'day');

    if (diffDays > 0) {
        res.status(400).json({
            success: false,
            message: "Hourly data is only supported for a single day. Please adjust your date range."
        });
        return;
    }

    const { rows } = await getAnalyticsByLinkService.query({
        clicksHour: linkId,
        start,
        end
    });

    const result = Array.from({ length: 24 }, (_, hour) => ({
        hour,
        count: 0,
    }));

    rows.forEach((row) => {
        const h = Number(row.hour);
        result[h].count = Number(row.count);
    });

    res.json({success: true, message: "Click Analytics", data: result});
}