import {QueryResult} from "pg";

export class AddInterface{
    public static query(data:unknown):Promise<QueryResult<any>>{
        return Promise.resolve({ rows: [], command: '', rowCount: 0, oid: 0, fields: [] });
    }
}