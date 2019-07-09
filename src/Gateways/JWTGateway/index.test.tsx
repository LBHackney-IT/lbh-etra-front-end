import fetchMock from 'fetch-mock'
import uuid from "uuid";
import JWTGateway, { IJWTGateway } from '.';


beforeEach(() => {
    localStorage.clear();
  });

it("can save JWT token for meeting", async () => {
  const gateway : IJWTGateway = new JWTGateway();

  const testData :string = "encodedJWTTokenString";


  await gateway.saveOfficerToken(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("OfficerToken", testData);
  expect((localStorage.__STORE__["OfficerToken"])).toEqual(testData);
});

it("can save JWT token for signOff", async () => {
  const gateway : IJWTGateway = new JWTGateway();

  const testData :string = "encodedJWTTokenString";

  await gateway.saveTraToken(testData);

  expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  expect(localStorage.setItem).toHaveBeenLastCalledWith("TraToken", testData);
  expect((localStorage.__STORE__["TraToken"])).toEqual(testData);
});