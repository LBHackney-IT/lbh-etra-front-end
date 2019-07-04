import { IMeetingModel } from "../../Domain/Meeting";

export interface IGetMeetingUseCase {
    Execute(): Promise<IMeetingModel | undefined>
}