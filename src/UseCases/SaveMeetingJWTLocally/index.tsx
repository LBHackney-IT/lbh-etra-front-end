import { IJWTGateway } from "../../Gateways/JWTGateway";
import{ISaveMeetingJWTUseCase} from "../../Boundary/SaveMeetingJWTLocally"

export class SaveMeetingJWTUseCase implements ISaveMeetingJWTUseCase{

  private readonly gateway:IJWTGateway;

  constructor(gateway:IJWTGateway){
    this.gateway = gateway;
  }

  public Execute(input:string){

    this.gateway.saveMeetingToken(input)

    return true
  }
}