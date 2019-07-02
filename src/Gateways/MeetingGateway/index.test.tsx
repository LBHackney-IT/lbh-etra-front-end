import MeetingGateway, { IMeetingGateway } from ".";
import fetchMock from 'fetch-mock'
import uuid from "uuid";
import { IMeetingModel } from "../../Domain/Meeting";
import { mockMeeting, mockAttendees, mockIssues, mockSignOff } from "../../Mocks/MockMeetingFactory";

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

  const testData : IMeetingModel = mockMeeting("Meeting 1");
  const dataArray = [
    testData
  ];
  const testDataString = JSON.stringify(dataArray);

  await gateway.saveMeetingDraft(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("draftMeetings", testDataString);
  expect(JSON.parse(localStorage.__STORE__["draftMeetings"])).toEqual(dataArray);
});

it("can save multiple meeting drafts", async () => {
  const gateway : IMeetingGateway = new MeetingGateway("");

  const testData : IMeetingModel = mockMeeting("Meeting 1");
  const testData2 : IMeetingModel = mockMeeting("Meeting 2");
  const dataArray = [
    testData,
    testData2
  ]
  const testDataString = JSON.stringify(dataArray);

  await gateway.saveMeetingDraft(testData);
  await gateway.saveMeetingDraft(testData2);

  expect(localStorage.setItem).toHaveBeenLastCalledWith("draftMeetings", testDataString);
  expect(JSON.parse(localStorage.__STORE__["draftMeetings"])).toEqual(dataArray);
});

it("saving pre-existing draft updates instead of adding new one", async () => {
  const gateway : IMeetingGateway = new MeetingGateway("");

  const testData : IMeetingModel = mockMeeting("Meeting 1");
  let editableData : IMeetingModel = mockMeeting("Meeting 2");

  await gateway.saveMeetingDraft(testData);
  await gateway.saveMeetingDraft(editableData);

  editableData.attendees = mockAttendees();
  editableData.issues = mockIssues();
  editableData.signOff = mockSignOff();

  await gateway.saveMeetingDraft(editableData);

  const dataArray = [
    testData,
    editableData
  ]

  const saved = JSON.parse(localStorage.__STORE__["draftMeetings"]);
  expect(saved).toHaveLength(2);
  expect(saved).toEqual(dataArray);
});

it("can get list of meeting drafts", async () => {
  const testData = mockMeeting("TEST MEETING");
  const testData2 = mockMeeting("TEST MEETING 2");

  const dataArray = [
    testData,
    testData2
  ]

  localStorage.__STORE__["draftMeetings"] = JSON.stringify(dataArray);

  const gateway : IMeetingGateway = new MeetingGateway("");
  const result = await gateway.getMeetingDrafts();

  expect(result).toEqual(dataArray);
});

it("gets empty list when no meeting drafts are saved", async () => {
  const gateway : IMeetingGateway = new MeetingGateway("");
  const result = await gateway.getMeetingDrafts();

  expect(result).toEqual([]);
})

describe("when saving a meeting", () => {
  const baseUrl = "http://localhost:3000";
  const gateway : IMeetingGateway = new MeetingGateway(baseUrl);
  const traId = uuid();
  const postUrl = `${baseUrl}/TRA/${traId}/meetings`;

  let testData : IMeetingModel;

  beforeEach(() => {
      testData = mockMeeting(uuid());
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