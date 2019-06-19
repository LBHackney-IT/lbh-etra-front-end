import { IIssueLocation } from "../../Domain/IssueLocation";

export interface IIssueLocationGateway {
    loadIssueLocations: () => Promise<ILoadIssuesOutputMeetingModel>;
}

export interface ILoadIssuesOutputMeetingModel{
    successful: boolean,
    issueLocations: IIssueLocation[]
}

