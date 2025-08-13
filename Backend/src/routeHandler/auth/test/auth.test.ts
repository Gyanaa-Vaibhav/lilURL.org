import request from 'supertest';
import {app} from '../../../app.js'
import { describe, it, expect } from 'vitest';
import {deleteUserService} from "../../../services/databaseService/deleteQueries/deleteUser";

describe('Sign-Up Route', () => {
    it('Should successfully Register a new user', async () => {
        await deleteUserService.query({email:"test@test.com"})
        const res = await request(app)
            .post('/auth/sign-up')
            .set("content-type", "application/json")
            .send({
                email:"test@test.com",
                password:"Password@123"
            })
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({success:true,token: expect.any(String)});
    });

    it('Should Return 409 User found', async () => {
        const res = await request(app)
            .post('/auth/sign-up')
            .set("content-type", "application/json")
            .send({
                email:"test@test.com",
                password:"Password@123"
            })
        expect(res.statusCode).toBe(409);
        expect(res.body).toMatchObject({success:false, message: 'Account already exists, Please Log-in'});
    });
});

describe("Login Route", () => {
    it("Should Allow Login",async ()=>{
        const res = await request(app)
            .post('/auth/login')
            .set("content-type", "application/json")
            .send({
                email:"test@gmail.com",
                password:"Password@123"
            })
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({success:true,username:"test",accessToken: expect.any(String),userId: expect.any(Number)});
    })

    it('Should Return 404 No user found', async () => {
        const res = await request(app)
            .post('/auth/login')
            .set("content-type", "application/json")
            .send({
                email:"gynanrudr0@gmail.com",
                password:"Password@123"
            })
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({success:false,message:"No user found."});
    });

    it('should reject incorrect password', async () => {
        const res = await request(app).post('/auth/login')
            .send({ email: 'test@gmail.com', password: 'wrongPassword' });
        expect(res.statusCode).toBe(401); // Unauthorized
    });

    it('should reject login for unregistered email', async () => {
        const res = await request(app).post('/auth/login')
            .send({ email: 'doesnotexist@example.com', password: '123456' });
        expect(res.statusCode).toBe(404);
    });

    it('should fail when required fields are missing', async () => {
        const res = await request(app).post('/auth/login')
            .send({ email: 'test@example.com' });
        console.log(res.body)
        expect(res.statusCode).toBe(400);
    });
})