import { SaveOfficerTokenUseCase } from ".";
import { IJWTGateway } from "../../Gateways/JWTGateway";

describe("SaveOfficerTokenUseCase", () => {
  it("successfully saves JWT for new meeting", async () => {
    const mockGateway: IJWTGateway = {
      saveOfficerToken: jest.fn(),
      saveTraToken: jest.fn(),
      getOfficerToken: jest.fn(),
      getTraToken:jest.fn()
    };

    const input:string="encodedMeetingJWT";

    await new SaveOfficerTokenUseCase(mockGateway).Execute(input);

    expect(mockGateway.saveOfficerToken).toBeCalledTimes(1);
    expect(mockGateway.saveOfficerToken).toHaveBeenCalledWith(input);
    expect(mockGateway.saveOfficerToken).toHaveReturned();
  });
});