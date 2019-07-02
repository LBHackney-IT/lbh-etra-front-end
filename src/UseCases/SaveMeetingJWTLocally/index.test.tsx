import { SaveMeetingJWTUseCase } from ".";
import { IJWTGateway } from "../../Gateways/JWTGateway";

describe("SaveJWTLocallyUseCase", () => {
  it("successfully saves JWT for new meeting", async () => {
    const mockGateway: IJWTGateway = {
      saveMeetingToken: jest.fn(),
      saveSignoffToken: jest.fn()
    };

    const input:string="encodedMeetingJWT";

    await new SaveMeetingJWTUseCase(mockGateway).Execute(input);

    expect(mockGateway.saveMeetingToken).toBeCalledTimes(1);
    expect(mockGateway.saveMeetingToken).toHaveBeenCalledWith(input);
    expect(mockGateway.saveMeetingToken).toHaveReturned();
  });
});