import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import {app} from '../../../app.js'

let short: string = "";

beforeAll(async () => {
    const res = await request(app)
        .post('/free/link')
        .set("content-type", "application/json")
        .send({
            longLink:"https://asd.com",
        })

    console.log("Creating Link",res.body)
    short = res.body.shortLink;
})

describe('redirect Route', () => {
    it('should render the redirect page', async () => {
        const res = await request(app).get('/redirect');
        expect(res.statusCode).toBe(404);
        expect(res.headers.location).toBe("https://www.lilurl.org");
    },20000);

    it('Should Create a free link to google.com', async () => {
        const res = await request(app)
            .post('/free/link')
            .set("content-type", "application/json")
            .send({
                longLink:"https://google.com",
            })
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({success:true})
        expect(res.body).toHaveProperty('shortURL');
    });


    it('Should Redirect to google.com', async () => {
        if (!short) return true
        const res = await request(app)
            .get(`/1`)
            .set("X-Forwarded-For", "4.2.23.43");
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe("https://asd.com");
    });

    it('should return 404 for invalid short code', async () => {
        const res = await request(app).get('/nonexistent123').set("X-Forwarded-For", "4.2.23.43");
        expect(res.statusCode).toBe(404);
        expect(res.headers.location).toBe("https://www.lilurl.org");
    });
});
