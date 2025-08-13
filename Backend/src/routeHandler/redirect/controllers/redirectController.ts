// Controller for redirect
import { Request, Response } from 'express';
import {UAParser} from 'ua-parser-js';
import {shortenerService,addAnalyticsService} from "../../../services/servicesExport.js";
import {logError, logWarn} from "../../../services/logger/loggerExport.js";

export async function renderRedirect(req:Request, res:Response) {
    const shortURL = req.params.shortURL;
    console.log("ShortURL",shortURL)
    if(!shortURL) return
    const returnURL = await shortenerService.getLongURL(shortURL)
    const linkID = returnURL?.linkID
    const {referrer,browser,os,deviceType,isBot,time,ip,isLocal} = getAnalyticsData(req)
    const location = await getIpLocation(ip);

    if(!linkID || !returnURL.longURL){
        res.redirect(404, "https://www.lilurl.org");
        return ;
    }

    if(!isLocal) await addAnalyticsService.query({referrer,browser,os,deviceType,time,isBot,ip,location,linkID,shortURL})

    if (returnURL.longURL) {
        const redirectURL = returnURL.longURL.startsWith("https://")
            ? returnURL.longURL
            : `https://${returnURL.longURL}`;
        res.redirect(302, redirectURL);
    }
}

async function getIpLocation(ip:string){
    if(!ip) return null;
    let location = null;

    try {
        const locRes = await fetch(`http://ip-api.com/json/${ip}`);
        const locData = await locRes.json();

        if (locData.status === 'success') {
            location = `${locData.city}, ${locData.country}`;
        } else {
            logWarn(`Location lookup failed: ${ locData.message || 'Unknown error'}`);
        }
    } catch (err) {
        logError(`Error fetching location from ip-api.com: ${err}`);
    }

    return location
}


function getAnalyticsData(req:Request){
    const userAgent = req.headers['user-agent'] || '';
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    const referrer = req.headers['referer'] || 'Direct'
    const browser = uaResult.browser.name || 'Unknown';
    const os = uaResult.os.name || 'Unknown';
    const deviceType = uaResult.device.type || 'desktop';
    const isBot = /bot|crawl|spider|preview|fetch/i.test(userAgent);
    const time = new Date()
    const forwarded = req.headers['x-forwarded-for'];
    const ip =
        typeof forwarded === 'string' ? forwarded.split(',')[0].trim() :
            req.socket.remoteAddress ||
            req.connection.remoteAddress ||
            'Unknown';
    const isLocal = ip.startsWith('127.') || ip === '::1' || ip === 'localhost';

    return {referrer,browser,os,deviceType,isBot,time,ip,isLocal}
}
