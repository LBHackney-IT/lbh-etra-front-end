import { IMeetingSignOffModel } from "../../Domain/Meeting";

export interface ISignOffMeetingUseCase {
    Execute(meeting: IMeetingSignOffModel): Promise<boolean>
}