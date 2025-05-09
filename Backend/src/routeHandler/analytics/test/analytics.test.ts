import request from 'supertest';
import express from 'express';
import {analyticsRouter} from '../routes/analyticsRoute.js';

const app = express();
app.use('/analytics', analyticsRouter);

describe('analytics Route', () => {
    it('should render the analytics page', async () => {
        const res = await request(app).get('/analytics');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Render analytics page here');
    });
});
