import { IJWTGateway } from "../../Gateways/JWTGateway";
import{IGetTokenUseCase} from "../../Boundary/GetTokensForCurrentSession"

export class GetTokenUseCase implements IGetTokenUseCase{

  private readonly gateway:IJWTGateway;

  constructor(gateway:IJWTGateway){
    this.gateway = gateway;
  }

  public Execute():Promise<string>{
   const token=this.gateway.getOfficerToken()|| this.gateway.getTraToken();
   return token;
  }
}