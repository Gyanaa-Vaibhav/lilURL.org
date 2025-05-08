import request from 'supertest';
import express from 'express';
import authRoute from '../routes/authRoute.js';

const app = express();
app.use('/auth', authRoute);

describe('auth Route', () => {
    it('should render the auth page', async () => {
        const res = await request(app).get('/auth');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Render auth page here');
    });
});
