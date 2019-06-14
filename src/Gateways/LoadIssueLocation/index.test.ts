import LoadIssueLocationGateway from ".";
import { IIssueLocationGateway, ILoadIssuesOutputMeetingModel } from '../../Boundary/IssueLocation'
import { IssueLocationFactory } from "../../Factories/IssueLocation";

const factory = new IssueLocationFactory();
const gateway: IIssueLocationGateway = new LoadIssueLocationGateway(factory);

it("Then output model is not null", async () => {
    const issueLocationResponse:ILoadIssuesOutputMeetingModel = await gateway.loadIssueLocations();
    expect(issueLocationResponse).not.toBeNull();
});

it("Then output model is true", async () => {
    const issueLocationResponse:ILoadIssuesOutputMeetingModel = await gateway.loadIssueLocations();
    expect(issueLocationResponse.successful).toBeTruthy();
});

it("Then output model issue locations is not null", async () => {
    const issueLocationResponse:ILoadIssuesOutputMeetingModel = await gateway.loadIssueLocations();
    expect(issueLocationResponse.issueLocations).not.toBeNull();  
});

it("Then output model has estate in it", async () => {
    const issueLocationResponse:ILoadIssuesOutputMeetingModel = await gateway.loadIssueLocations();
    expect(issueLocationResponse.issueLocations).not.toBeNull();  
});

it("Then output model has blocks in it", async () => {
    const issueLocationResponse:ILoadIssuesOutputMeetingModel = await gateway.loadIssueLocations();
    expect(issueLocationResponse).not.toBeNull();  
});
