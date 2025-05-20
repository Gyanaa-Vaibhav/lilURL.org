import express from 'express';
import {renderUpdate, updateQR} from '../controllers/updateController.js';

export const updateRouter = express.Router();

// Default route to render the update page
updateRouter.get('/', renderUpdate);
updateRouter.post('/qr', updateQR);
