import { IMeetingModel, IUnreviewedMeetingModel, IMeetingSignOffModel } from "../../Domain/Meeting";
import { GatewayResponse, IGatewayResponse } from "../../Boundary/GatewayResponse";
import JWTGateway from "../JWTGateway";

export interface IGetMeetingResponse extends IGatewayResponse {
  meeting?: IMeetingModel;
}

export class GetMeetingResponse implements IGetMeetingResponse {
  successful: boolean;
  result: string;
  meeting?: IMeetingModel;

  constructor(successful: boolean, result: string, meeting?: IMeetingModel){
    this.successful = successful;
    this.result = result;
    this.meeting = meeting;
  }
}

export interface IMeetingGateway {
  readonly baseUrl: string;
  saveMeetingDraft: (data: IMeetingModel) => Promise<void>;
  getMeetingDrafts: () => Promise<Array<IMeetingModel>>;
  saveMeetingData: (data: IMeetingModel | IUnreviewedMeetingModel) => Promise<GatewayResponse>;
  signOffMeeting: (data: IMeetingSignOffModel) => Promise<GatewayResponse>;
  getMeetingData: () => Promise<IGetMeetingResponse>;
}

export default class MeetingGateway implements IMeetingGateway {
  constructor(baseUrl: string, jwtGateway: JWTGateway){
    this.baseUrl = baseUrl;
    this.jwtGateway = jwtGateway;
  }

  readonly baseUrl: string;
  readonly jwtGateway: JWTGateway;

  public async saveMeetingDraft(data: IMeetingModel): Promise<void> {
    const draftMeetingsJson = localStorage.getItem("draftMeetings");
    const draftMeetings : Array<IMeetingModel> 
      = draftMeetingsJson ? JSON.parse(draftMeetingsJson) : [];

    let found = false;
    for(let i = 0; i < draftMeetings.length; i++){
      if(draftMeetings[i].id === data.id){
        draftMeetings[i] = data;
        found = true;
        break;
      }
    }

    if(!found){
      draftMeetings.push(data);
    }

    return await localStorage.setItem("draftMeetings", JSON.stringify(draftMeetings));
  }

  public async getMeetingDrafts(): Promise<Array<IMeetingModel>> {
    const draftMeetingsJson = localStorage.getItem("draftMeetings");
    const draftMeetings : Array<IMeetingModel> = 
      draftMeetingsJson ? JSON.parse(draftMeetingsJson) : [];
      return draftMeetings;
  }

  public async saveMeetingData(data: IMeetingModel | IUnreviewedMeetingModel): Promise<IGatewayResponse> {
    const officerToken = await this.jwtGateway.getOfficerToken();
    
    return await fetch(
      `${this.baseUrl}/v2/tra/meeting`, 
      {
        method: "POST",
        headers: this.buildHeaders(officerToken),
        body: JSON.stringify(data)
      }
    ).then((response) => {
      return new GatewayResponse(response.ok, response.statusText);
    }).catch((error : Error) => {
      return new GatewayResponse(false, error.message);
    });
  }

  public async signOffMeeting(data: IMeetingSignOffModel): Promise<IGatewayResponse> {
    const traToken = await this.jwtGateway.getTraToken();

    return await fetch(
      `${this.baseUrl}/v2/tra/meeting`, 
      {
        method: "PATCH",
        headers: this.buildHeaders(traToken),
        body: JSON.stringify(data)
      }
    )
    .then((response) => {
      return new GatewayResponse(response.ok, response.statusText);
    }).catch((error : Error) => {
      return new GatewayResponse(false, error.message);
    });
  }

  public async getMeetingData() : Promise<IGetMeetingResponse> {
    const traToken = await this.jwtGateway.getTraToken();
    let thisResponse: Response;

    return await fetch(
      `${this.baseUrl}/v2/tra/meeting`, 
      {
        method: "GET",
        headers: this.buildHeaders(traToken)
      }
    )
    .then((response) => {
      thisResponse = response;
      if (!thisResponse.ok) {
        throw Error(response.statusText);
      }
      return response.json() as Promise<IMeetingModel>
    })
    .then((data) => {
      return new GetMeetingResponse(thisResponse.ok, thisResponse.statusText, data);
    }).catch((error : Error) => {
      return new GetMeetingResponse(false, error.message);
    });
  }

  private buildHeaders(token: string) {
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  }
}
