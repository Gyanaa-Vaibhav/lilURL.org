import request from 'supertest';
import {app} from '../../../app.js'
import { describe, it, expect } from 'vitest';

const userObject =await request(app)
    .post('/auth/login')
    .set("content-type", "application/json")
    .send({
        email:"test@gmail.com",
        password:"Password@123"
    })
const token = userObject.body.accessToken;

describe('update Route', () => {
    it('should render the update page', async () => {
        const res = await request(app)
            .get('/update')
            .set("authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Render update page here');
    });
});
