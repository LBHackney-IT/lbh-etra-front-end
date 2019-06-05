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



// { 
//     "estateOfficerId": "1f1bb727-ce1b-e811-8118-70106faa6a31",
//     "subject": "c1f72d01-28dc-e711-8115-70106faa6a11",
//     "estateOfficerName": "Megan Holden",
//     "officerPatchId": "8e958a37-8653-e811-8126-70106faaf8c1",
//     "areaName": "6",
//     "managerId": "5512c473-9953-e811-8126-70106faaf8c1",
//     "serviceRequest": {
//       "description": "new ETRA meeting issue",
//       "subject": "c1f72d01-28dc-e711-8115-70106faa6a11",
//       "createdBy": "1f1bb727-ce1b-e811-8118-70106faa6a31"
//     },
//     "traId": "3",
//     "parentInteractionId":"6d7d967b-7224-e911-a96c-002248072abd",
//     "issueLocation": "test location 2",
//     "natureOfEnquiry": "28",
//     "enquirySubject": "100000219",
//     "processType":"3"
//    } 