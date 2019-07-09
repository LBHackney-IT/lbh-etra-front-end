import { IJWTGateway } from "../../Gateways/JWTGateway";
import{ISaveOfficerTokenUseCase} from "../../Boundary/SaveOfficerTokenLocally"

export class SaveOfficerTokenUseCase implements ISaveOfficerTokenUseCase{

  private readonly gateway:IJWTGateway;

  constructor(gateway:IJWTGateway){
    this.gateway = gateway;
  }

  public Execute(input:string){

    this.gateway.saveOfficerToken(input)

    return true
  }
}