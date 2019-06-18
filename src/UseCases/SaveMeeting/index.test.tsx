import { IMeetingGateway } from "../../Gateways/MeetingGateway";
import { SaveMeetingUseCase, SaveMeetingInputModel } from ".";
import { IAttendees } from "../../Components/Attendees";
import { IIssue } from "../../Domain/Issues";

describe("SaveMeetingUseCase", () => {
  it("successfully saves meeting", async () => {
    const mockGateway: IMeetingGateway = {
      saveMeeting: jest.fn()
    };

    const input = new SaveMeetingInputModel(issues, "testdata", mockAttendees());

    await new SaveMeetingUseCase(mockGateway).Execute(input);

    expect(mockGateway.saveMeeting).toBeCalledTimes(1);
    expect(mockGateway.saveMeeting).toHaveBeenCalledWith(input);
    expect(mockGateway.saveMeeting).toHaveReturned();
  });
});

function mockAttendees() : IAttendees {
  return {
      Councillors: "Jim, Bob, Steve",
      HackneyStaff: "Fleb",
      NumberOfAttendees: 10
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

