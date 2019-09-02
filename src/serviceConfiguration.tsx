import MeetingGateway, { IMeetingGateway } from "./Gateways/MeetingGateway";
import { ISaveMeetingDraftUseCase } from "./Boundary/SaveMeetingDraft";
import { SaveMeetingDraftUseCase } from "./UseCases/SaveMeetingDraft";
import { IServiceContainer } from "./ServiceContext";
import JWTGateway, { IJWTGateway } from "./Gateways/JWTGateway";
import { ISaveOfficerTokenUseCase } from "./Boundary/SaveOfficerTokenLocally";
import { SaveOfficerTokenUseCase } from "./UseCases/SaveOfficerTokenLocally";
import { IGetTokenUseCase } from "./Boundary/GetTokensForCurrentSession";
import { GetTokenUseCase } from "./UseCases/GetTokensForCurrentSession";
import { ISaveTraTokenUsecase } from "./Boundary/SaveTraTokenLocally";
import { SaveTraTokenUsecase } from "./UseCases/SaveTraTokenLocally";
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
    container.bind<ISaveOfficerTokenUseCase>("ISaveOfficerTokenUseCase", new SaveOfficerTokenUseCase(container.get<IJWTGateway>("IJWTGateway")));
    container.bind<ISaveTraTokenUsecase>("ISaveTraTokenUsecase", new SaveTraTokenUsecase(container.get<IJWTGateway>("IJWTGateway")));
    container.bind<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase", new SaveMeetingDraftUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<IGetMeetingDraftsUseCase>("IGetMeetingDraftsUseCase", new GetMeetingDraftsUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<ICreateMeetingUseCase>("ICreateMeetingUseCase", new CreateMeetingUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<ISignOffMeetingUseCase>("ISignOffMeetingUseCase", new SignOffMeetingUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<IGetMeetingUseCase>("IGetMeetingUseCase", new GetMeetingUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    container.bind<IGetTokenUseCase>("IGetTokenUseCase", new GetTokenUseCase(container.get<IJWTGateway>("IJWTGateway")));


    return container;
}