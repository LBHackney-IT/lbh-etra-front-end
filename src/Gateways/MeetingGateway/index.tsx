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
    return await localStorage.setItem("currentMeeting", JSON.stringify(data));
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
