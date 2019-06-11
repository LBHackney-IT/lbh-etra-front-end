import MeetingGateway, { IMeetingGateway } from ".";

const gateway: IMeetingGateway = new MeetingGateway();

beforeEach(() => {
    localStorage.clear();
  });

it("can save meeting data", async () => {
  const testData = {issues: [], signatureBase64: "saiinosda"};
  const testDataString = JSON.stringify(testData);

  await gateway.saveMeeting(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("currentMeeting", testDataString);
  expect(JSON.parse(localStorage.__STORE__["currentMeeting"])).toEqual(testData);
});