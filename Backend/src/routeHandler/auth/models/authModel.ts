import {loginLogic} from "./loginLogic.js";
import {Request, Response} from 'express';

export default {};
export async function handelLogin (req:Request,res:Response) {
    await loginLogic(req, res)
}