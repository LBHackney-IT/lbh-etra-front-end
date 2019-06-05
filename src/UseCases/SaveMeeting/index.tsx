import React from 'react';
import { IIssue } from '../../Components/Issues';

export interface ISaveMeetingInputModel{
    issues:Array<IIssue>
}

export class SaveMeetingInputModel implements ISaveMeetingInputModel{
    public issues:Array<IIssue>;
    constructor(issues: Array<IIssue>){
        this.issues = issues;
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