import {Response,Request,NextFunction,RequestHandler} from "express";
import {JwtPayloadCustom} from "../../../services/authServices/jwt.js";

const validateUserId:RequestHandler = (req:Request, res:Response, next:NextFunction) => {
    const { userId } = req.params;

    if (!/^\d+$/.test(userId)) {
        res.status(400).json({ success: false, message: "Invalid userId" });
        return;
    }

    if((req.user as JwtPayloadCustom).userId !== Number(userId)){
        res.status(403).json({success:false,message:"Forbidden: Access denied"})
        return;
    }

    next();
};

export default validateUserId;