import { ISaveMeetingInputModel } from "../../Boundary/SaveMeeting";

export interface IMeetingGateway {
  readonly baseUrl: string;
  saveMeetingDraft: (data: ISaveMeetingInputModel) => Promise<void>;
  saveMeetingData: (traId: string, data: ISaveMeetingInputModel) => Promise<void>;
}

export default class MeetingGateway implements IMeetingGateway {
  constructor(baseUrl: string){
    this.baseUrl = baseUrl;
  }

  readonly baseUrl: string;

  public async saveMeetingDraft(data: ISaveMeetingInputModel): Promise<void> {
    return await localStorage.setItem("currentMeeting", JSON.stringify(data));
  }

  public async saveMeetingData(traId: string, data: ISaveMeetingInputModel): Promise<void> {
    await fetch(
      `${this.baseUrl}/TRA/${traId}/meetings`, 
      {
        method: "post",
        body: JSON.stringify(data)
      }
    );
  }
}
