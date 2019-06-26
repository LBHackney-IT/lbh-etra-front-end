import MeetingGateway, { IMeetingGateway } from "./Gateways/MeetingGateway";
import { ISaveMeetingDraftUseCase } from "./Boundary/SaveMeetingDraft";
import { SaveMeetingDraftUseCase } from "./UseCases/SaveMeetingDraft";
import { IServiceContainer } from "./ServiceContext";
import { IIssueLocationGateway as ILoadIssueLocationGateway } from "./Boundary/IssueLocation";
import LoadIssueLocationGateway from "./Gateways/LoadIssueLocation";
import { IIssueLocationFactory, IssueLocationFactory } from "./Factories/IssueLocation";

export default function configureServices(container: IServiceContainer) {
    //Factories
    container.bind<IIssueLocationFactory>("IIssueLocationFactory", new IssueLocationFactory());

    //Gateways
    container.bind<IMeetingGateway>("IMeetingGateway", new MeetingGateway(""));
    container.bind<ILoadIssueLocationGateway>("ILoadIssueLocationGateway", 
        new LoadIssueLocationGateway(container.get<IIssueLocationFactory>("IIssueLocationFactory")));

    //Use Cases
    container.bind<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase", new SaveMeetingDraftUseCase(container.get<IMeetingGateway>("IMeetingGateway")));
    return container;
}