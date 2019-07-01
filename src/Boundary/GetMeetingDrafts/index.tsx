import { IMeetingModel } from "../../Domain/Meeting";

export interface IGetMeetingDrafts {
    Execute(): Promise<Array<IMeetingModel>>
}