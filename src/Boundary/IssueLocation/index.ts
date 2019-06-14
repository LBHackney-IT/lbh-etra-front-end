import { IIssueLocation } from "../../Domain/IssueLocation";

export interface IIssueLocationGateway {
    loadIssueLocations: () => Promise<ILoadIssuesOutputMeetingModel>;
}

export interface ILoadIssuesOutputMeetingModel{
    successful: boolean,
    issueLocations: IIssueLocation[]
}

export class LoadIssuesOutputMeetingModel implements ILoadIssuesOutputMeetingModel{
    public successful: boolean;
    public issueLocations: IIssueLocation[]
    public constructor(successful:boolean, issueLocations: IIssueLocation[]){
        this.successful = successful;
        this.issueLocations = issueLocations;
    }
}