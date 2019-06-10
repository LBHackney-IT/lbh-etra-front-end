export interface IServiceHash {
    [key: string]: any;
}

export interface IServiceProvider {
    get<T>(serviceName: string): T;
}

export interface IServiceContainer extends IServiceProvider{
    services: IServiceHash;
    bind<T>(serviceName: string, service: T): void;
}

export class ServiceContainer implements IServiceContainer {
    public services: IServiceHash;

    constructor() {
        this.services = {};
    }

    public bind<T>(serviceName: string, service: T): void {
        this.services[serviceName] = service;
    }

    public get<T>(serviceName: string): T {
        return this.services[serviceName];
    }
}