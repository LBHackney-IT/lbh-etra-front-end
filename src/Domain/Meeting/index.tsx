import { IIssue } from "../Issues";
import { IAttendees } from "../Attendees";
import { ISignOff } from "../SignOff";
import { v4 as uuid } from "uuid";

export interface IMeetingModel {
    id: string;
    meetingName: string,
    issues: Array<IIssue>,
    attendees: IAttendees
    signOff: ISignOff
}

export class MeetingModel implements IMeetingModel {
    public readonly id: string;
    public meetingName: string;    
    public issues: IIssue[];
    public attendees: IAttendees;
    public signOff: ISignOff

    constructor(meetingName: string, issues: IIssue[], attendees: IAttendees, signOff: ISignOff) {
        this.id = uuid();
        this.meetingName = meetingName;
        this.issues = issues;
        this.attendees = attendees;
        this.signOff = signOff;
    }
}