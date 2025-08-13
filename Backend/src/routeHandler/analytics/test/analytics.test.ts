import request from 'supertest';
import { describe, it, expect } from 'vitest';
import {app} from '../../../app.js'
import {analyticsRouter} from "../../routeHandlerExport";
import {shortenerService} from "../../../services/shortenerService/shortenerService";

app.use('/analytics', analyticsRouter);
const linkObject = await shortenerService.createLink("https://google.com")
const linkId = linkObject.shortURL

const userObject =await request(app)
    .post('/auth/login')
    .set("content-type", "application/json")
    .send({
        email:"test@gmail.com",
        password:"Password@123"
    })
const token = userObject.body.accessToken;
const userId = userObject.body.userId;
const startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
const endTime = new Date().toISOString();
// const db = Database.getInstance();
// const query = `INSERT INTO analyticsdata (
//   linkid, shorturl, userid, referrer, browser, os, devicetype, ip, location, isbot, time, qr
// ) VALUES
// (1, '1', $1, 'https://google.com', 'Chrome', 'Windows', 'Desktop', '192.168.1.1', 'Mumbai, India', false, NOW() - interval '5 minutes', false),
// (1, '1', $1, 'https://facebook.com', 'Firefox', 'macOS', 'Laptop', '192.168.1.2', 'Delhi, India', false, NOW() - interval '1 hour', true),
// (1, '1', $1, 'https://twitter.com', 'Safari', 'iOS', 'Mobile', '192.168.1.3', 'Bangalore, India', false, NOW() - interval '3 hours', false),
// (1, '1', $1, 'https://t.co', 'Edge', 'Windows', 'Desktop', '192.168.1.4', 'Hyderabad, India', false, NOW() - interval '1 day', false),
// (1, '1', $1, '', 'Chrome', 'Android', 'Mobile', '10.0.0.1', 'Pune, India', true, NOW() - interval '2 days', false),
// (1, '1', $1, 'https://linkedin.com', 'Chrome', 'Linux', 'Laptop', '10.0.0.2', 'Chennai, India', false, NOW() - interval '3 days', false),
// (1, '1', $1, '', 'Safari', 'iOS', 'Tablet', '172.16.0.1', 'Ahmedabad, India', false, NOW() - interval '10 minutes', true),
// (1, '1', $1, 'https://instagram.com', 'Firefox', 'Windows', 'Desktop', '172.16.0.2', 'Jaipur, India', false, NOW() - interval '20 minutes', false),
// (1, '1', $1, '', 'Bot', 'Linux', 'Server', '8.8.8.8', 'USA - Google Bot', true, NOW() - interval '4 hours', false),
// (1, '1', $1, '', 'Bot', 'Linux', 'Server', '8.8.4.4', 'Singapore - Bing Bot', true, NOW() - interval '5 hours', false);
// `
// const rows = await db.query(query,[userId])
// console.log(rows)

describe('analytics Route', () => {
    // it('should render the analytics page', async () => {
    //     const res = await request(app).get('/analytics');
    //     expect(res.statusCode).toBe(200);
    //     expect(res.text).toBe('Render analytics page here');
    // });

    it("Should get userData",async () => {
        const res = await request(app)
            .get(`/analytics/${userId}?start=${startTime}&end=${endTime}`)
            .set('authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            success: true,
            userId: expect.any(String),
            data: {
                device: expect.any(Array),
                os: expect.any(Array),
                location: expect.any(Array),
                click: expect.any(Array),
            },
            qrStats: {
                qrClicks: expect.any(Number),
                linkClicks: expect.any(Number),
            },
            impression: expect.any(Number),
            linkCount: expect.any(Number),
        });

        for (const deviceObj of res.body.data.device) {
            expect(deviceObj).toMatchObject({
                deviceType: expect.any(String),
                count: expect.any(Number),
            });
        }

        for (const osObj of res.body.data.os) {
            expect(osObj).toMatchObject({
                os: expect.any(String),
                count: expect.any(Number),
            });
        }

        for (const locationObj of res.body.data.location) {
            expect(locationObj).toMatchObject({
                location: expect.any(String),
                count: expect.any(Number),
            });
        }

    })

    it("Should get OS data",async ()=>{
        const res = await request(app)
            .get(`/analytics/${linkId}/os?start=${startTime}&end=${endTime}`)
            .set('authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            success: true,
            message: "OS Analytics",
            data: expect.any(Array),
        })

        for (const osObj of res.body.data) {
            expect(osObj).toMatchObject({
                os: expect.any(String),
                count: expect.any(Number),
            });
        }
    })

    it("Should get Devices data",async ()=>{
        const res = await request(app)
            .get(`/analytics/${linkId}/devices?start=${startTime}&end=${endTime}`)
            .set('authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            success: true,
            message: "Device Analytics",
            data: expect.any(Array),
        })

        for (const osObj of res.body.data) {
            expect(osObj).toMatchObject({
                deviceType: expect.any(String),
                count: expect.any(Number),
            });
        }
    })

    it("Should get geo location data",async ()=>{
        const res = await request(app)
            .get(`/analytics/${linkId}/geo?start=${startTime}&end=${endTime}`)
            .set('authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            success: true,
            message: "Geo Analytics",
            data: expect.any(Array),
        })

        for (const geoObj of res.body.data) {
            expect(geoObj).toMatchObject({
                count: expect.any(Number),
            });
            expect(typeof geoObj.location === 'string' || geoObj.location === null).toBe(true);
        }
    })

    it("Should get click data",async ()=>{
        const res = await request(app)
            .get(`/analytics/${linkId}/clicks?start=${startTime}&end=${endTime}`)
            .set('authorization', `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({
            success: true,
            message: "Click Analytics",
            data: expect.any(Array),
        })

        for (const clickObj of res.body.data) {
            expect(clickObj).toMatchObject({
                day: expect.any(String),
                count: expect.any(Number),
            });
        }
    })
});

describe("Analytics Route False Constraints", () => {
    it("Should throw error when we get userData with wrong Date format",async () => {
        const res = await request(app)
            .get(`/analytics/${userId}?start=${new Date()}&end=${new Date()}`)
            .set('authorization', `Bearer ${token}`)
        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({success:false,message: 'Invalid Date Format' })
    })

    it("Should fail on request without token",async () => {
        const res = await request(app)
            .get(`/analytics/${userId}?start=${new Date()}&end=${new Date()}`)
        expect(res.status).toBe(401);
        expect(res.body).toMatchObject({success:false ,error: 'Authorization token missing or malformed',})
    })

    it("Should fail when 'start' query param is missing", async () => {
        const res = await request(app)
            .get(`/analytics/${userId}?end=${endTime}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({ success: false, message: "Missing Parameter Start or end Date" });
    });

    it("Should fail when 'end' query param is missing", async () => {
        const res = await request(app)
            .get(`/analytics/${userId}?start=${startTime}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({ success: false, message: "Missing Parameter Start or end Date" });
    });

    it("Should fail when 'start' is after 'end'", async () => {
        const res = await request(app)
            .get(`/analytics/${userId}?start=${endTime}&end=${startTime}`)
            .set('authorization', `Bearer ${token}`);
        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({ success: false, message: "'start' date must be before 'end' date" });
    });

    it("Should fail with invalid userId (non-numeric)", async () => {
        const res = await request(app)
            .get(`/analytics/invalidUserId?start=${startTime}&end=${endTime}`)
            .set('authorization', `Bearer ${token}`);

        expect(res.status).toBe(400);
        expect(res.body).toMatchObject({ success: false, message: 'Invalid userId' });
    });

    it("Should fail with unauthorized access for another user's data", async () => {
        const anotherUserId = 99999; // assuming this userId is different/not allowed
        const res = await request(app)
            .get(`/analytics/${anotherUserId}?start=${startTime}&end=${endTime}`)
            .set('authorization', `Bearer ${token}`);
        console.log(res.body)
        expect(res.status).toBe(403);
        expect(res.body).toMatchObject({ success: false, message: 'Forbidden: Access denied' });
    });
})
