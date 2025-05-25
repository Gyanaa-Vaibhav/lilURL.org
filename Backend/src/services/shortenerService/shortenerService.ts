import {base62Decoder,base62Encoder} from './utils/utilsExport.js'
import {getLinkService,addLinkService,getExpiredLinksService} from "../databaseService/databaseExports.js";

/**
 * @file shortenerService.ts
 * @description Service class for creating and resolving short URLs. Supports link reusability and future integration with expired link recycling.
 */

type commonType = {
    success:boolean,
    message:"Success" | "Not Found" | "Expired" | "Exists",
}

type ReturnURL = {
    longURL?:string,
    linkID?:number
} & commonType

type CreateLinkType = {
    shortURL?:string
} & commonType

/**
 * Handles creation of short URLs and retrieval of their corresponding long URLs.
 * Supports checking for existing links and basic expiration validation.
 */
export class ShortenerService{
    private index;
    private getLinkService = getLinkService
    private addLinkService = addLinkService
    private getExpiredLinksService = getExpiredLinksService

    /**
     * Constructs the ShortenerService and optionally accepts a starting index.
     * @param {number} [index] - Optional starting index for generating new short URLs.
     */
    constructor(index?:number) {
        this.index = index
    }

    /**
     * Creates a short URL for the given long link. Reuses existing short link if already present.
     * Optionally handles expired links in future enhancement.
     * @param {string} LongLink - The original long URL to shorten.
     * @returns {Promise<CreateLinkType>} - Object indicating success and containing the short URL.
     */
    public async createLink(LongLink:string):Promise<CreateLinkType> {
        if(!this.index) await this.updateIndex()

        const linkExists = await this.getLinkService.query({longURL:LongLink})
        const expiredLinks = await this.getExpiredLinksService.getFirstID()
        console.log(expiredLinks)

        if(linkExists.rows) {
            console.warn("Short link already exists returning the old one:",linkExists.rows[0].shorturl)
            return {success:true,message:"Exists",shortURL:linkExists.rows[0].shorturl};
        }

        if(expiredLinks?.id){
            console.log("ok Expired has Things")
            //TODO need to add Expired Logic
        }

        const shortURL = base62Encoder(this.index!)
        await this.addLinkService.query({shortLink: shortURL,LongLink})
        this.index!++;
        return {success:true,message:'Success',shortURL}
    }

    /**
     * Resolves the short link to its original long URL, checking for expiration.
     * @param {string} shortLink - The short URL identifier.
     * @returns {Promise<ReturnURL>} - Object with resolution status, original URL, and link ID.
     */
    public async getLongURL(shortLink:string):Promise<ReturnURL>{
        const {rows} = await this.getLinkService.query({shortLink})
        const longURL = rows[0]?.longurl
        const expiryTime = rows[0]?.expiresat
        const linkID = rows[0]?.linkid

        if(expiryTime && new Date(expiryTime).getTime() > new Date().getTime()){
            return {success:false,message:"Expired",linkID}
        }

        if(rows.length){
            return {success:true,message:"Success",longURL,linkID}

        }

        return {success:false,message:"Not Found",linkID}
    }

    /**
     * Updates the internal index from the latest entry in the database.
     * This ensures unique short link generation for new entries.
     * @private
     */
    private async updateIndex():Promise<void> {
        console.warn("Index not found or initiated fetching from DB")
        const {rows} = await this.getLinkService.lastIndex()
        this.index = rows[0]?.linkid + 1 || 1
    }
}

export const shortenerService = new ShortenerService()
// const shortUrl = await shortenerService.createLink("www.google.com")
// const Link = await shortenerService.getLongURL("j")
// console.log(Link?.longURL)