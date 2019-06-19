import MeetingGateway, { IMeetingGateway } from ".";
import { IAttendees } from "../../Components/Attendees";
import { IIssue } from '../../Domain/Issues';

const gateway: IMeetingGateway = new MeetingGateway();

beforeEach(() => {
    localStorage.clear();
  });
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
  function mockAttendees() : IAttendees {
    return {
        Councillors: "Jim, Bob, Steve",
        HackneyStaff: "Fleb",
        NumberOfAttendees: 10
    }
  }

it("can save meeting data", async () => {
  const testData = {issues: issues, signatureBase64: "saiinosda", attendees: mockAttendees()};
  const testDataString = JSON.stringify(testData);

  await gateway.saveMeeting(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("currentMeeting", testDataString);
  expect(JSON.parse(localStorage.__STORE__["currentMeeting"])).toEqual(testData);
});