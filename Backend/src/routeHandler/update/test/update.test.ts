import request from 'supertest';
import {app} from '../../../app.js'
import { describe, it, expect, beforeAll } from 'vitest';

let token:string;

beforeAll(async () => {
    const res = await request(app)
        .post('/auth/sign-up')
        .set("content-type", "application/json")
        .send({
            email:"test2@test.com",
            password:"Password@123"
        })
    console.log("RES", res.body)
    const userObject =await request(app)
        .post('/auth/login')
        .set("content-type", "application/json")
        .send({
            email:"test2@test.com",
            password:"Password@123"
        })
    console.log("User Object Update", userObject.body)
    token = userObject.body.accessToken;
})

describe('update Route', () => {
    it('should render the update page', async () => {
        const res = await request(app)
            .get('/update/')
            .set("authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Render update page here');
    });
});
