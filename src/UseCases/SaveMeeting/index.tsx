import React from 'react';
import { IIssue } from '../../Domain/Issues';
import { ISaveMeetingInputModel, ISaveMeetingUseCase, ISaveMeetingOutputModel } from '../../Boundary/SaveMeeting';
import { IMeetingGateway } from '../../Gateways/MeetingGateway';
import { IAttendees } from '../../Components/Attendees';

export class SaveMeetingOutputModel implements ISaveMeetingOutputModel{
    public successful:boolean;
    constructor(successful: boolean){
        this.successful = successful;
    }
}

export class SaveMeetingInputModel implements ISaveMeetingInputModel {
    public issues:Array<IIssue>;
    public signatureBase64: string;
    public attendees: IAttendees;
    constructor(issues: Array<IIssue>, signatureBase64: string, attendees: IAttendees){
        this.issues = issues;
        this.signatureBase64 = signatureBase64;
        this.attendees = attendees;
    }
}

export class SaveMeetingUseCase implements ISaveMeetingUseCase{
    private readonly gateway: IMeetingGateway;

    constructor(gateway: IMeetingGateway) {
      this.gateway = gateway;
    }

    Execute(inputModel: ISaveMeetingInputModel): ISaveMeetingOutputModel {
        this.gateway.saveMeeting(inputModel);

        return new SaveMeetingOutputModel(true);
    }
}