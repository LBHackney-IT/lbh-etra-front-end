import { ISaveMeetingInputModel } from "../../Boundary/SaveMeeting";

export interface IMeetingGateway {
  saveMeeting: (data: ISaveMeetingInputModel) => Promise<void>;
}

export default class MeetingGateway implements IMeetingGateway {

  public async saveMeeting(data: ISaveMeetingInputModel): Promise<void> {
    return await localStorage.setItem("currentMeeting", JSON.stringify(data));
  }
}
