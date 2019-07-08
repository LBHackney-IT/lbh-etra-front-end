import MeetingGateway, { IMeetingGateway } from "../../Gateways/MeetingGateway";
import { SaveMeetingDraftUseCase } from ".";
import { IIssue } from "../../Domain/Issues";
import { MeetingModel } from "../../Domain/Meeting";
import { IAttendees } from "../../Domain/Attendees";

describe("SaveMeetingDraftUseCase", () => {
  it("successfully saves meeting", async () => {
    const mockGateway: IMeetingGateway = {
      baseUrl: "",
      saveMeetingDraft: jest.fn(),
      saveMeetingData: jest.fn()
    };

    const input = new MeetingModel("Test Meeting", issues, "testdata", mockAttendees());

    await new SaveMeetingDraftUseCase(mockGateway).Execute(input);

    expect(mockGateway.saveMeetingDraft).toBeCalledTimes(1);
    expect(mockGateway.saveMeetingDraft).toHaveBeenCalledWith(input);
    expect(mockGateway.saveMeetingDraft).toHaveReturned();
  });
});

function mockAttendees() : IAttendees {
  return {
      Councillors: "Jim, Bob, Steve",
      HackneyStaff: "Fleb",
      Attendees: 10
  }
}

const issues: Array<IIssue> = Array(
  { 
    "Id": "", 
    "IssueType": {
      "IssueId": "100000222",
      "IssueType": "Bushes and trees"
    },
    "Location":{
      "blockId": "00075265",
      "estateId":"",
      "key":"59a3f619-d2a5-442d-af79-6e07f6b03e7d",
      "locationType": 1,
      "name":"De Beauvoir Estate  1-56 Corbiere House",
    },
    "Notes":"f" 
  },
 
);

