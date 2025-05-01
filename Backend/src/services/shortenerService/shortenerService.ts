import {base62Decoder,base62Encoder} from './utils/utilsExport.js'
import {GetLink,AddLink} from "../database/databaseExports.js";


export class ShortenerService{
    private index;
    private getLink = new GetLink()
    private addLink = new AddLink()

    constructor(index?:number) {
        this.index = index
    }

    public async createLink(LongLink:string):Promise<string> {
        const oldQuery = await this.getLink.query({longURL:LongLink})

        if(oldQuery.rows) {
            console.warn("Short link already exists returning the old one:",oldQuery.rows[0].shorturl)
            return oldQuery.rows[0].shorturl;
        }

        if(!this.index){
            console.warn("Index not found or initiated fetching from DB")
            const {rows} = await this.getLink.lastIndex()
            this.index = rows[0]?.linkid + 1 || 1
        }

        const shortLink = base62Encoder(this.index!)
        await this.addLink.query({shortLink,LongLink})
        this.index!++;
        return shortLink
    }

    public async getLongURL(shortLink:string){
        const {rows} = await this.getLink.query({shortLink})
        return rows[0].longurl
    }
}

const shortenerService = new ShortenerService()
await shortenerService.createLink("www.google.com")
await shortenerService.getLongURL("j")