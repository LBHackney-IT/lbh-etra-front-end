import { IJWTGateway } from "../../Gateways/JWTGateway";
import{ISaveTraTokenUsecase} from "../../Boundary/SaveTraTokenLocally"

export class SaveTraTokenUsecase implements ISaveTraTokenUsecase{
  private readonly gateway:IJWTGateway;

  constructor(gateway:IJWTGateway){
    this.gateway=gateway;
  }

  public Execute(input:string){
    this.gateway.saveTraToken(input)

    return true
  }
}