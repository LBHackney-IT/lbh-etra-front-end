import { IServiceContainer } from "./Services/ServiceContainer";
import MeetingGateway, { IMeetingGateway } from "./Gateways/MeetingGateway";
import { ISaveMeetingUseCase } from "./Boundary/SaveMeeting";
import { SaveMeetingUseCase } from "./UseCases/SaveMeeting";

export default function configureServices(container: IServiceContainer) {
    //Gateways
    container.bind<IMeetingGateway>("IMeetingGateway", new MeetingGateway());

    //Use Cases
    container.bind<ISaveMeetingUseCase>("ISaveMeetingUseCase", 
        new SaveMeetingUseCase(container.get<IMeetingGateway>("IMeetingGateway")));

    return container;
}