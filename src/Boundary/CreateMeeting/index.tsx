import { IMeetingModel, IUnreviewedMeetingModel } from "../../Domain/Meeting";

export interface ICreateMeetingUseCase {
    Execute(meeting: IMeetingModel | IUnreviewedMeetingModel): Promise<boolean>
}