import { IJWTGateway } from "../../Gateways/JWTGateway";
import{ISaveSignOffJWTUsecase} from "../../Boundary/SaveSignOffJWTLocally"

export class SaveSignOffJWTUsecase implements ISaveSignOffJWTUsecase{
  private readonly gateway:IJWTGateway;

  constructor(gateway:IJWTGateway){
    this.gateway=gateway;
  }

  public Execute(input:string){
    this.gateway.saveSignoffToken(input)

    return true
  }
}