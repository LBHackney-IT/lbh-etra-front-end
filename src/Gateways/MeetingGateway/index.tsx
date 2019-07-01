import { IMeetingModel } from "../../Domain/Meeting";
import { GatewayResponse, IGatewayResponse } from "../../Boundary/GatewayResponse";

export interface IMeetingGateway {
  readonly baseUrl: string;
  saveMeetingDraft: (data: IMeetingModel) => Promise<void>;
  saveMeetingData: (traId: string, data: IMeetingModel) => Promise<GatewayResponse>;
}

export default class MeetingGateway implements IMeetingGateway {
  constructor(baseUrl: string){
    this.baseUrl = baseUrl;
  }

  readonly baseUrl: string;

  public async saveMeetingDraft(data: IMeetingModel): Promise<void> {
    const draftMeetingsJson = localStorage.getItem("draftMeetings");
    let draftMeetings : Array<IMeetingModel> 
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

  public async saveMeetingData(traId: string, data: IMeetingModel): Promise<IGatewayResponse> {
    return await fetch(
      `${this.baseUrl}/TRA/${traId}/meetings`, 
      {
        method: "post",
        body: JSON.stringify(data)
      }
    ).then((response) => {
      return new GatewayResponse(response.ok, response.statusText);
    }).catch((error : Error) => {
      return new GatewayResponse(false, error.message);
    });
  }
}
