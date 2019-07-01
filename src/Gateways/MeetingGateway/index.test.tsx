import MeetingGateway, { IMeetingGateway } from ".";
import { IIssue } from '../../Domain/Issues';
import fetchMock from 'fetch-mock'
import uuid from "uuid";
import { IMeetingModel } from "../../Domain/Meeting";
import { IAttendees } from "../../Domain/Attendees";
import { ISignOff } from "../../Domain/SignOff";
import faker from 'faker';

beforeEach(() => {
    localStorage.clear();
  });

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

it("can save multiple meeting drafts", async () => {
  const gateway : IMeetingGateway = new MeetingGateway("");

  const testData : IMeetingModel = meetingInput("Meeting 1");
  const testData2 : IMeetingModel = meetingInput("Meeting 2");
  const testDataString = JSON.stringify([testData, testData2]);

  await gateway.saveMeetingDraft(testData);
  await gateway.saveMeetingDraft(testData2);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("draftMeetings", testDataString);
  expect(JSON.parse(localStorage.__STORE__["draftMeetings"])).toEqual(testData);
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

function mockIssues(): Array<IIssue> {
  const totalIssues = faker.random.number(10);
  const arrayOfIssues : Array<IIssue> = [];

  for(let i = 0; i < totalIssues; i++){
    arrayOfIssues.push(mockIssue());
  }

  return arrayOfIssues;
}

function mockIssue() : IIssue {
  return { 
    "Id": faker.random.uuid(), 
    "IssueType": {
      "IssueId": faker.random.alphaNumeric(),
      "IssueType": faker.random.words()
    },
    "Location":{
      "name": faker.address.streetAddress(),
    },
    "Notes": faker.random.words(30) 
  }
}

function mockAttendees() : IAttendees {
  return {
      Councillors: listOfNames(),
      HackneyStaff: listOfNames(),
      NumberOfAttendees: faker.random.number()
  }
}

function listOfNames() : string {
  const number = faker.random.number(10);
  let names = "";

  for(let i = 0; i < number; i++){
    names += `${faker.name.findName()}, `
  }

  return names;
}

function mockSignOff() : ISignOff {
  return {
    signature: faker.image.dataUri(),
    role: faker.random.word(),
    name: faker.name.findName()
  }
}

function meetingInput(meetingName: string): IMeetingModel {
  return {
    meetingName: meetingName, 
    issues: mockIssues(),
    attendees: mockAttendees(),
    signOff: mockSignOff()
  }
}