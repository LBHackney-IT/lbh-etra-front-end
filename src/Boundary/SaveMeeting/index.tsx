import { IIssue } from "../../Domain/Issues";
import { IAttendees } from "../../Components/Attendees";

export interface ISaveMeetingOutputModel{
    successful: boolean
}

export interface ISaveMeetingUseCase{
    Execute(meeting: ISaveMeetingInputModel): ISaveMeetingOutputModel
}

export interface ISaveMeetingInputModel {
    issues:Array<IIssue>,
    signatureBase64: string
    attendees:IAttendees
    repName:string
}