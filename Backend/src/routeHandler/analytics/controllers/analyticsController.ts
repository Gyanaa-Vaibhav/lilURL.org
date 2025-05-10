// Controller for analytics
import { Request, Response } from 'express';
import {getAnalyticsService} from "../../../services/servicesExport.js";
import dayjs from "dayjs";

export const renderAnalytics = async (req:Request,res:Response)=>{
    // @ts-ignore
    const userId = req.params.userId || req.user?.userId;
    const start = req.query.start as string;
    const end = req.query.end as string;
    const {rows} = await getAnalyticsService.query({userID:Number(userId),start,end})
    const grouped: {
        device: Record<string, number>;
        os: Record<string, number>;
        location: Record<string, number>;
        click: Record<string, number>;
    } = {
        device: {},
        os: {},
        location: {},
        click: {},
    };

    for (const row of rows) {
        // Device
        const device = row.isbot ? "Bot" :
            /mobile/i.test(row.devicetype) ? "Mobile" :
                /tablet/i.test(row.devicetype) ? "Tablet" :
                    /tv/i.test(row.devicetype) ? "TV" :
                        /desktop|pc/i.test(row.devicetype) ? "Desktop" : "Others";
        grouped.device[device] = (grouped.device[device] || 0) + 1;

        // OS
        grouped.os[row.os] = (grouped.os[row.os] || 0) + 1;

        // Location
        grouped.location[row.location] = (grouped.location[row.location] || 0) + 1;

        // Clicks by day
        const day = dayjs(row.time).format("YYYY-MM-DD");
        grouped.click[day] = (grouped.click[day] || 0) + 1;
    }
    res.json({success:true, linkId: userId,data:grouped,impression:rows.length})
}