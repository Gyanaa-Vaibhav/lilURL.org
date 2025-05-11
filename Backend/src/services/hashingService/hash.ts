import bcrypt from "bcrypt";

class HashWorker {
    public async hashString(string:string): Promise<string>{
        return await bcrypt.hash(string, 10)
    }

    public async compareString(string: string,hash:string): Promise<boolean>{
        return await bcrypt.compare(string, hash);
    }
}

export const hashService = new HashWorker();