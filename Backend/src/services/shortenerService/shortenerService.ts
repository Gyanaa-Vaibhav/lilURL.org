import {base62Decoder,base62Encoder} from './utils/utilsExport.js'
import {getLinkService,addLinkService,getExpiredLinksService} from "../databaseService/databaseExports.js";

type ReturnURL = {
    success:boolean,
    message:"Success" | "Not Found" | "Expired",
    longURL?:string,
}

type CreateLinkType = {
    success:boolean,
    message:"Success" | "Not Found" | "Expired",
    shortURL?:string
}

export class ShortenerService{
    private index;
    private getLinkService = getLinkService
    private addLinkService = addLinkService
    private getExpiredLinksService = getExpiredLinksService

    constructor(index?:number) {
        this.index = index
    }

    public async createLink(LongLink:string):Promise<CreateLinkType> {
        if(!this.index) await this.updateIndex()

        const linkExists = await this.getLinkService.query({longURL:LongLink})
        const expiredLinks = await this.getExpiredLinksService.getFirstID()
        console.log(expiredLinks)

        if(linkExists.rows) {
            console.warn("Short link already exists returning the old one:",linkExists.rows[0].shorturl)
            return {success:true,message:"Success",shortURL:linkExists.rows[0].shorturl};
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

    public async getLongURL(shortLink:string):Promise<ReturnURL>{
        const {rows} = await this.getLinkService.query({shortLink})
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
        const {rows} = await this.getLinkService.lastIndex()
        this.index = rows[0]?.linkid + 1 || 1
    }
}

const shortenerService = new ShortenerService()
// const shortUrl = await shortenerService.createLink("www.google.com")
const Link = await shortenerService.getLongURL("j")
console.log(Link?.longURL)