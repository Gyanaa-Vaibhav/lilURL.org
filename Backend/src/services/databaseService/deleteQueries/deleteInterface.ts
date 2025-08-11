import {QueryResult} from "pg";

export class DeleteInterface{
    public async query(_linkId:unknown):Promise<QueryResult<any>>{
        return Promise.resolve({ rows: [], command: '', rowCount: 0, oid: 0, fields: [] });
    }
}