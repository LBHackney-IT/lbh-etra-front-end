import { IMeetingModel } from "../../Domain/Meeting";

export interface IGetMeetingDraftsUseCase {
    Execute(): Promise<Array<IMeetingModel>>
}