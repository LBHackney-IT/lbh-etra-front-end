import { IIssue } from "../Issues";
import { IAttendees } from "../Attendees";
import { ISignOff } from "../SignOff";
import { v4 as uuid } from "uuid";

export interface IUnreviewedMeetingModel {
    traId: number;
    meetingName: string;
    issues: Array<IIssue>;
    meetingAttendance: IAttendees;
}

export interface IMeetingSignOffModel {
    id: string;
    signOff: ISignOff;
}

export interface IMeetingModel extends IUnreviewedMeetingModel, IMeetingSignOffModel{
    isSignedOff: boolean,
}

export class UnreviewedMeetingModel implements IUnreviewedMeetingModel {  
    public readonly traId: number;
    meetingName: string;
    issues: IIssue[];
    meetingAttendance: IAttendees;

    constructor(traId: number, meetingName: string, issues: IIssue[], attendees: IAttendees){
        this.traId = traId;
        this.meetingName = meetingName;
        this.issues = issues;
        this.meetingAttendance = attendees;
    }
}

export class MeetingSignOffModel implements IMeetingSignOffModel {
    id: string;
    signOff: ISignOff;    

    constructor(id: string, signOff: ISignOff){
        this.id = id;
        this.signOff = signOff;
    }
}

export class MeetingModel implements IMeetingModel {
    public readonly id: string;
    public readonly traId: number;
    public meetingName: string;    
    public issues: IIssue[];
    public meetingAttendance: IAttendees;
    public signOff: ISignOff
    public isSignedOff: boolean;

    constructor(traId: number, meetingName: string, issues: IIssue[], attendees: IAttendees, signOff: ISignOff, id?: string){
        this.id = id || uuid();
        this.traId = traId;
        this.meetingName = meetingName;
        this.issues = issues;
        this.meetingAttendance = attendees;
        this.signOff = signOff;
        this.isSignedOff = false;
    }
}