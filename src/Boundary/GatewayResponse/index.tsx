export interface IGatewayResponse {
    successful: boolean;
    result: string;
}

export class GatewayResponse implements IGatewayResponse {
    public readonly successful: boolean;
    public readonly result: string;

    constructor(successful: boolean, result: string){
        this.successful = successful;
        this.result = result;
    }
}