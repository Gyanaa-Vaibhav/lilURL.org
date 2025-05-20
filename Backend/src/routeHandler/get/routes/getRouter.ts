import express from 'express';
import {getQrOptions, getUserDetails, renderGet} from '../controllers/getController.js';

export const getRouter = express.Router();

getRouter.get('/', renderGet);
getRouter.get('/qr', getQrOptions);
getRouter.get('/user', getUserDetails);
