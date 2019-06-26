import MeetingGateway, { IMeetingGateway } from ".";
import { IAttendees } from "../../Components/Attendees";
import { IIssue } from '../../Domain/Issues';
import { ISaveMeetingInputModel } from "../../Boundary/SaveMeeting";
import fetchMock from 'fetch-mock'
import uuid from "uuid";

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

  function meetingInput(meetingName: string): ISaveMeetingInputModel {
    return {
      meetingName: "A meeting", 
      issues: issues, 
      signatureBase64: "saiinosda", 
      attendees: mockAttendees()};
  }

it("can set base url", async() => {
  const baseUrl = "http://localhost:3000";
  const gateway : IMeetingGateway = new MeetingGateway(baseUrl)

  expect(gateway.baseUrl).toBe(baseUrl);
})

it("can save meeting draft", async () => {
  const gateway : IMeetingGateway = new MeetingGateway("");

  const testData : ISaveMeetingInputModel = meetingInput("Meeting 1");
  const testDataString = JSON.stringify(testData);

  await gateway.saveMeetingDraft(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("currentMeeting", testDataString);
  expect(JSON.parse(localStorage.__STORE__["currentMeeting"])).toEqual(testData);
});

it("save meeting data sends correct data", async () => {
  const baseUrl = "http://localhost:3000";
  const traId = uuid();
  const gateway : IMeetingGateway = new MeetingGateway(baseUrl);
  const testData : ISaveMeetingInputModel = meetingInput("Meeting 2");

  const postUrl = `${baseUrl}/TRA/${traId}/meetings`;

  fetchMock.post(postUrl, 200);

  await gateway.saveMeetingData(traId, testData);

  expect(fetchMock.done()).toEqual(true);
  expect(fetchMock.called(postUrl)).toBe(true);

  const lastOptions = fetchMock.lastOptions();
  expect(lastOptions && lastOptions.body).toEqual(JSON.stringify(testData));
});