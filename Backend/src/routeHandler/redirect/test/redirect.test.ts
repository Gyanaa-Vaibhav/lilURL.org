import request from 'supertest';
import { describe, it, expect } from 'vitest';
import {app} from '../../../app.js'

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
        const res = await request(app).get("/1")
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe("https://google.com");
    });

    it('should return 404 for invalid short code', async () => {
        const res = await request(app).get('/nonexistent123');
        expect(res.statusCode).toBe(404);
        expect(res.headers.location).toBe("https://www.lilurl.org");
    });
});
