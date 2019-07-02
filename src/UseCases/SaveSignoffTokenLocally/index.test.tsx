import{SaveSignOffJWTUsecase} from ".";
import { IJWTGateway } from "../../Gateways/JWTGateway";

describe("SaveSignOffJWTUsecase", () => {
  it("can save JWT token for a singoff meeting", async () =>{
    const mockGateway:IJWTGateway={
      saveMeetingToken: jest.fn(),
      saveSignoffToken: jest.fn()
    }
    const input:string = "encodedSignoffToken";

    await new SaveSignOffJWTUsecase(mockGateway).Execute(input);

    expect(mockGateway.saveSignoffToken).toBeCalledTimes(1);
    expect(mockGateway.saveSignoffToken).toBeCalledWith(input);
    expect(mockGateway.saveSignoffToken).toHaveReturned();
  });
});

