import request from 'supertest';
import express from 'express';
import {getRouter} from '../routes/getRouter';

const app = express();
app.use('/get', getRouter);

describe('get Route', () => {
    it('should render the get page', async () => {
        const res = await request(app).get('/get');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Render get page here');
    });
});
