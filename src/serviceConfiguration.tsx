import MeetingGateway, { IMeetingGateway } from "./Gateways/MeetingGateway";
import { ISaveMeetingDraftUseCase } from "./Boundary/SaveMeetingDraft";
import { SaveMeetingDraftUseCase } from "./UseCases/SaveMeetingDraft";
import { IServiceContainer } from "./ServiceContext";
import JWTGateway, { IJWTGateway } from "./Gateways/JWTGateway";
import { ISaveMeetingJWTUseCase } from "./Boundary/SaveMeetingJWTLocally";
import { SaveMeetingJWTUseCase } from "./UseCases/SaveMeetingJWTLocally";
import { ISaveSignOffJWTUsecase } from "./Boundary/SaveSignOffJWTLocally";
import { SaveSignOffJWTUsecase } from "./UseCases/SaveSignoffTokenLocally";
import { IGetMeetingDraftsUseCase } from "./Boundary/GetMeetingDrafts";
import { GetMeetingDraftsUseCase } from "./UseCases/GetMeetingDrafts";

export default function configureServices(container: IServiceContainer) {
    //Gateways
    container.bind<IMeetingGateway>("IMeetingGateway", new MeetingGateway(""));
    container.bind<IJWTGateway>("IJWTGateway", new JWTGateway());

    //Use Cases
    container.bind<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase", new SaveMeetingDraftUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<ISaveMeetingJWTUseCase>("ISaveMeetingJWTUseCase", new SaveMeetingJWTUseCase(container.get<IJWTGateway>("IJWTGateway")));
    container.bind<ISaveSignOffJWTUsecase>("ISaveSignOffJWTUsecase", new SaveSignOffJWTUsecase(container.get<IJWTGateway>("IJWTGateway")));
    container.bind<IGetMeetingDraftsUseCase>("IGetMeetingDraftsUseCase", new GetMeetingDraftsUseCase(container.get<IMeetingGateway>("IMeetingGateway")));

    return container;
}