export interface ISignOff {
    signature: string;
    name: string;
    role: string;
}

export class SignOff implements ISignOff {
    public signature: string;    
    public name: string;
    public role: string;

    constructor(signature: string, name: string, role: string){
        this.signature = signature;
        this.name = name;
        this.role = role;
    }
}