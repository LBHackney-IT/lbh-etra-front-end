import MeetingGateway, { IMeetingGateway } from ".";
import { IAttendees } from "../../Components/Attendees";
import { IIssue } from '../../Domain/Issues';
import fetchMock from 'fetch-mock'
import uuid from "uuid";
import { IMeetingModel } from "../../Domain/Meeting";

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

  function meetingInput(meetingName: string): IMeetingModel {
    return {
      meetingName: meetingName, 
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

  const testData : IMeetingModel = meetingInput("Meeting 1");
  const testDataString = JSON.stringify(testData);

  await gateway.saveMeetingDraft(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("currentMeeting", testDataString);
  expect(JSON.parse(localStorage.__STORE__["currentMeeting"])).toEqual(testData);
});

describe("when saving a meeting", () => {
  const baseUrl = "http://localhost:3000";
  const gateway : IMeetingGateway = new MeetingGateway(baseUrl);
  const traId = uuid();
  const postUrl = `${baseUrl}/TRA/${traId}/meetings`;

  let testData : IMeetingModel;

  beforeEach(() => {
      testData = meetingInput(uuid());
      fetchMock.restore();
  });

  it("save meeting data hits endpoint", async () => {
    fetchMock.post(postUrl, 200);

    await gateway.saveMeetingData(traId, testData);

    expect(fetchMock.done()).toEqual(true);
    expect(fetchMock.called(postUrl)).toBe(true);
  });

  it("save meeting data sends correct data", async () => {
    fetchMock.post(postUrl, 200);

    await gateway.saveMeetingData(traId, testData);

    const lastOptions = fetchMock.lastOptions();
    expect(lastOptions && lastOptions.body).toEqual(JSON.stringify(testData));
  });

  it("save meeting data returns correct response when returning 200", async () => {
    fetchMock.post(postUrl, 200);

    const result = await gateway.saveMeetingData(traId, testData);

    expect(result.successful).toBe(true);
  });

  it("save meeting data returns correct response when returning 500", async () => {
    fetchMock.post(postUrl, 500);

    const result = await gateway.saveMeetingData(traId, testData);

    expect(result.successful).toBe(false);
    expect(result.result).toBe("Internal Server Error");
  });

  it("save meeting data returns correct response when network fails", async () => {
    const errorMessage = "Network Error Occurred";
    fetchMock.post(postUrl, () => {throw new Error(errorMessage)});

    const result = await gateway.saveMeetingData(traId, testData);

    expect(result.successful).toBe(false);
    expect(result.result).toBe(errorMessage);
  });
});