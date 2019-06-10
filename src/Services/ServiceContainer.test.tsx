import { IServiceContainer, IServiceHash, ServiceContainer } from "./ServiceContainer";

describe("when getting a service", () => {
    it("returns the bound service", () => {
        const serviceName = "IMyService";
        const myService = new MyService();
        const services: IServiceHash = { [serviceName]: myService };
        const container: IServiceContainer = new ServiceContainer();
        container.services = services;

        const result = container.get<any>(serviceName);

        expect(result).toBe(myService);
    });

    it("returns undefined when service has not been bound", () => {
        const container: IServiceContainer = new ServiceContainer();

        const result = container.get<any>("UnboundService");

        expect(result).toBe(undefined);
    });
});

describe("when binding a service", () => {
    it("adds the service to the services hash", () => {
        const serviceName = "IMyService";
        const myService = new MyService();
        const container: IServiceContainer = new ServiceContainer();

        container.bind<IMyService>(serviceName, myService);

        expect(container.services[serviceName]).toBe(myService);
    });
});

interface IMyService {
    doThing: () => void;
}

class MyService implements IMyService {
    public doThing(): void { }
}