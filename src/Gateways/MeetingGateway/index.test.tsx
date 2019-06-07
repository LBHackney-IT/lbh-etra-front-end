import MeetingGateway, { IMeetingGateway } from ".";

const gateway: IMeetingGateway = new MeetingGateway();

beforeEach(() => {
    localStorage.clear();
  });

it("can save meeting data", async () => {
  const testData = "oihaefsoihsgohaoi";

  await gateway.saveMeeting(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("currentMeeting", testData);
  expect(localStorage.__STORE__["currentMeeting"]).toEqual(testData);
});