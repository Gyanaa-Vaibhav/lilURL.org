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

describe('get Route', () => {
    it('should render the get page', async () => {
        const res = await request(app)
            .get('/get')
            .set("authorization", `Bearer ${token}`);
        console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Render get page here');
    });

    it('should get /qr options if exist', async () => {
        const res = await request(app)
            .get('/get/qr')
            .set("authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({success:true});
        expect(typeof res.body.qr_options === "string" || res.body.qr_options === null).toBe(true);
    });

    it('should get /user details', async () => {
        const res = await request(app)
            .get('/get/user')
            .set("authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            success:true,
            linkData:expect.any(Array),
            userData:{
                username: expect.any(String),
                email: expect.any(String),
                createdAt: expect.any(String),
            }
        });

    });

    it('should use get /link to create ot get a new link', async () => {
        const res = await request(app)
            .get('/get/link')
            .set("authorization", `Bearer ${token}`);
        console.log(res.body)
    //     TODO Need to add logic and code

    });
});
