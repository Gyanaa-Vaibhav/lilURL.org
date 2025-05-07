import request from 'supertest';
import express from 'express';
import {redirectRouter} from '../routes/redirectRoute.js';

const app = express();
app.use('/redirect', redirectRouter);

describe('redirect Route', () => {
    it('should render the redirect page', async () => {
        const res = await request(app).get('/redirect');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Render redirect page here');
    });
});
