import { IIssue } from "../../Components/Issues";

export interface ISaveMeetingOutputModel{
    successful: boolean
}

export interface ISaveMeetingUseCase{
    Execute(meeting: ISaveMeetingInputModel): ISaveMeetingOutputModel
}

export interface ISaveMeetingInputModel {
    issues:Array<IIssue>,
    signatureBase64: string
}