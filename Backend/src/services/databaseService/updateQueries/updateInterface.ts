import {QueryResult} from "pg";

export class UpdateInterface {
    public async query(where:unknown,what:unknown):Promise<QueryResult<any>>{
        return Promise.resolve({ rows: [], command: '', rowCount: 0, oid: 0, fields: [] });
    }
}