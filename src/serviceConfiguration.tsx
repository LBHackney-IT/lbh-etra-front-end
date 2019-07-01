import MeetingGateway, { IMeetingGateway } from "./Gateways/MeetingGateway";
import { ISaveMeetingDraftUseCase } from "./Boundary/SaveMeetingDraft";
import { SaveMeetingDraftUseCase } from "./UseCases/SaveMeetingDraft";
import { IServiceContainer } from "./ServiceContext";
import { IGetMeetingDraftsUseCase } from "./Boundary/GetMeetingDrafts";
import { GetMeetingDraftsUseCase } from "./UseCases/GetMeetingDrafts";

export default function configureServices(container: IServiceContainer) {
    //Gateways
    container.bind<IMeetingGateway>("IMeetingGateway", new MeetingGateway(""));

    //Use Cases
    container.bind<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase", new SaveMeetingDraftUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<IGetMeetingDraftsUseCase>("IGetMeetingDraftsUseCase", new GetMeetingDraftsUseCase(container.get<IMeetingGateway>("IMeetingGateway")));

    return container;
}