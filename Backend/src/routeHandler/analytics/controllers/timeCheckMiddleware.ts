import {NextFunction,Response,Request} from "express";

export function timeCheckMiddleware(req:Request, res:Response,next:NextFunction) {
    const start = req.query.start as string;
    const end = req.query.end as string;
    if(!start || !end) {
        res.statusCode = 400;
        res.json({success:false,message:"Missing Parameter Start or end Date"})
        return;
    }
    if(!isValidDateStrict(start) || !isValidDateStrict(end)){
        res.statusCode = 400;
        res.json({success:false,message:"Invalid Date Format"});
        return;
    }

    if(new Date(start).getTime() > new Date(end).getTime()) {
        res.statusCode = 400;
        res.json({success:false,message:"'start' date must be before 'end' date"});
        return;
    }
    next();
}

function isValidDate(d:string) {
    return !isNaN(Date.parse(d));
}

function isValidISODate(str:string) {
    // Basic ISO 8601 regex pattern (YYYY-MM-DDTHH:mm:ssZ)
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
    return isoRegex.test(str);
}

function isValidDateStrict(d:string) {
    return isValidDate(d) && isValidISODate(d);
}