import { IMeetingModel } from "../../Domain/Meeting";

export interface ISaveMeetingDraftUseCase {
    Execute(meeting: IMeetingModel): boolean
}