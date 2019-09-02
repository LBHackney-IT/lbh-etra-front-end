import{SaveTraTokenUsecase} from ".";
import { IJWTGateway } from "../../Gateways/JWTGateway";

describe("SaveTraTokenUsecase", () => {
  it("can save JWT token for a singoff meeting", async () =>{
    const mockGateway:IJWTGateway={
      saveOfficerToken: jest.fn(),
      saveTraToken: jest.fn(),
      getOfficerToken: jest.fn(),
      getTraToken:jest.fn()
    }
    const input:string = "encodedSignoffToken";

    await new SaveTraTokenUsecase(mockGateway).Execute(input);

    expect(mockGateway.saveTraToken).toBeCalledTimes(1);
    expect(mockGateway.saveTraToken).toBeCalledWith(input);
    expect(mockGateway.saveTraToken).toHaveReturned();
  });
});

