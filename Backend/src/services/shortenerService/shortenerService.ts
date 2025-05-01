import {base62Decoder,base62Encoder} from './utils/utilsExport.js'
import {GetLink,AddLink,GetExpiredLinks} from "../database/databaseExports.js";

type ReturnURL = {
    success:boolean,
    message:"Success" | "Not Found" | "Expired",
    longURL?:string
}
export class ShortenerService{
    private index;
    private getLink = new GetLink()
    private addLink = new AddLink()
    private getExpiredLink = new GetExpiredLinks()

    constructor(index?:number) {
        this.index = index
    }

    public async createLink(LongLink:string):Promise<string> {
        const oldQuery = await this.getLink.query({longURL:LongLink})
        const expiredLinks = await this.getExpiredLink.getFirstID()

        if(oldQuery.rows) {
            console.warn("Short link already exists returning the old one:",oldQuery.rows[0].shorturl)
            return oldQuery.rows[0].shorturl;
        }

        if(!expiredLinks){

        }

        if(!this.index) await this.updateIndex()

        const shortLink = base62Encoder(this.index!)
        await this.addLink.query({shortLink,LongLink})
        this.index!++;
        return shortLink
    }

    public async getLongURL(shortLink:string):Promise<ReturnURL>{
        const {rows} = await this.getLink.query({shortLink})
        const longURL = rows[0]?.longurl
        const expiryTime = rows[0]?.expiresat

        if(expiryTime && new Date(expiryTime).getTime() > new Date().getTime()){
            return {success:false,message:"Expired"}
        }

        if(rows.length){
            return {success:true,message:"Success",longURL}

        }
        return {success:false,message:"Not Found"}
    }

    private async updateIndex():Promise<void> {
        console.warn("Index not found or initiated fetching from DB")
        const {rows} = await this.getLink.lastIndex()
        this.index = rows[0]?.linkid + 1 || 1
    }
}

const shortenerService = new ShortenerService()
const shortUrl = await shortenerService.createLink("www.google.com")
const {success} = await shortenerService.getLongURL("j")