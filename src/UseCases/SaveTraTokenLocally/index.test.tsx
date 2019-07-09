import{SaveTraTokenUsecase} from ".";
import { IJWTGateway } from "../../Gateways/JWTGateway";

describe("SaveTraTokenUsecase", () => {
  it("can save JWT token for a singoff meeting", async () =>{
    const mockGateway:IJWTGateway={
      saveOficerToken: jest.fn(),
      saveTraToken: jest.fn()
    }
    const input:string = "encodedSignoffToken";

    await new SaveTraTokenUsecase(mockGateway).Execute(input);

    expect(mockGateway.saveTraToken).toBeCalledTimes(1);
    expect(mockGateway.saveTraToken).toBeCalledWith(input);
    expect(mockGateway.saveTraToken).toHaveReturned();
  });
});

