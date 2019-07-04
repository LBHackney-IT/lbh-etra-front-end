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
import { ICreateMeetingUseCase } from "./Boundary/CreateMeeting";
import { CreateMeetingUseCase } from "./UseCases/CreateMeeting";
import { ISignOffMeetingUseCase } from "./Boundary/SignOffMeeting";
import { SignOffMeetingUseCase } from "./UseCases/SignOffMeeting";
import { IGetMeetingUseCase } from "./Boundary/GetMeeting";
import { GetMeetingUseCase } from "./UseCases/GetMeeting";
import getEnvVariable from "./Utilities/environmentVariables";

const apiBaseUrl: string = getEnvVariable("API_BASE_URL");

export default function configureServices(container: IServiceContainer) {
    //Gateways
    container.bind<IJWTGateway>("IJWTGateway", new JWTGateway());
    container.bind<IMeetingGateway>("IMeetingGateway", new MeetingGateway(apiBaseUrl, container.get<IJWTGateway>("IJWTGateway")));

    //Use Cases
    container.bind<ISaveMeetingJWTUseCase>("ISaveMeetingJWTUseCase", new SaveMeetingJWTUseCase(container.get<IJWTGateway>("IJWTGateway")));
    container.bind<ISaveSignOffJWTUsecase>("ISaveSignOffJWTUsecase", new SaveSignOffJWTUsecase(container.get<IJWTGateway>("IJWTGateway")));
    container.bind<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase", new SaveMeetingDraftUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<IGetMeetingDraftsUseCase>("IGetMeetingDraftsUseCase", new GetMeetingDraftsUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<ICreateMeetingUseCase>("ICreateMeetingUseCase", new CreateMeetingUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<ISignOffMeetingUseCase>("ISignOffMeetingUseCase", new SignOffMeetingUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<IGetMeetingUseCase>("IGetMeetingUseCase", new GetMeetingUseCase(container.get<IMeetingGateway>("IMeetingGateway")));

    return container;
}