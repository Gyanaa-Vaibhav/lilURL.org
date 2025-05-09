import {NextFunction,Response,Request} from "express";

export function timeCheckMiddleware(req:Request, res:Response,next:NextFunction) {
    const start = req.query.start as string;
    const end = req.query.end as string;
    if(!start || !end) {
        res.json({success:false,message:"Missing Parameter Start or end Date"})
        return;
    }
    next();
}