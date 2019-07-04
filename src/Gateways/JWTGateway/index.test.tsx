import fetchMock from 'fetch-mock'
import uuid from "uuid";
import JWTGateway, { IJWTGateway } from '.';


beforeEach(() => {
    localStorage.clear();
  });

it("can save JWT token for meeting", async () => {
  const gateway : IJWTGateway = new JWTGateway();

  const testData :string = "encodedJWTTokenString";


  await gateway.saveMeetingToken(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("MeetingToken", testData);
  expect((localStorage.__STORE__["MeetingToken"])).toEqual(testData);
});

it("can save JWT token for signOff", async () => {
  const gateway : IJWTGateway = new JWTGateway();

  const testData :string = "encodedJWTTokenString";

  await gateway.saveSignoffToken(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("SignOffToken", testData);
  expect((localStorage.__STORE__["SignOffToken"])).toEqual(testData);
});