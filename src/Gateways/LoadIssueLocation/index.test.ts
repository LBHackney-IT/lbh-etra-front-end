import IssueLocationGateway from ".";
import { IIssueLocationGateway } from '../../Boundary/IssueLocation'
import { IssueLocationFactory } from "../../Factories/IssueLocation";
const factory = new IssueLocationFactory();
const gateway: IIssueLocationGateway = new IssueLocationGateway(factory);

beforeEach(() => {
    localStorage.clear();
  });



describe('When we go to load issue location data', async () => {
    let issueLocationResponse = await gateway.loadIssueLocations();

    it("Then output model is not null", () => {
        expect(issueLocationResponse).not.toBeNull();
    });

    it("Then output model is true", () => {
        expect(issueLocationResponse.successful).toBeTruthy();
    });

    it("Then output model issue locations is not null", () => {
        expect(issueLocationResponse.issueLocations).not.toBeNull();  
    });

    it("Then output model has estate in it", () => {
        expect(issueLocationResponse.issueLocations).not.toBeNull();  
    });

    it("Then output model has blocks in it", () => {
        expect(issueLocationResponse).not.toBeNull();  
    });
});