import React from 'react';
import { IIssue } from '../../Domain/Issues';

export interface ISaveMeetingInputModel{
    issues:Array<IIssue>,
    signatureBase64: string
}

export class SaveMeetingInputModel implements ISaveMeetingInputModel{
    public issues:Array<IIssue>;
    public signatureBase64: string;
    constructor(issues: Array<IIssue>, signatureBase64: string){
        this.issues = issues;
        this.signatureBase64 = signatureBase64;
    }
}

export interface ISaveMeetingOutputModel{
    successful :boolean
}

export class SaveMeetingOutputModel implements ISaveMeetingOutputModel{
    public successful:boolean;
    constructor(successful: boolean){
        this.successful = successful;
    }
}

export interface ISaveMeetingUseCase{
    Execute(inputModel:ISaveMeetingInputModel):ISaveMeetingOutputModel
}

export class SaveMeetingUseCase implements ISaveMeetingUseCase{

    Execute(inputModel: ISaveMeetingInputModel): ISaveMeetingOutputModel {
        return new SaveMeetingOutputModel(true);
    }
}