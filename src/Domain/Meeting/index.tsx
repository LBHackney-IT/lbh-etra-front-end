import { IIssue } from "../Issues";
import { IAttendees } from "../../Components/Attendees";

export interface IMeetingModel {
    meetingName: string,
    issues:Array<IIssue>,
    signatureBase64: string
    attendees:IAttendees
}

export class MeetingModel implements IMeetingModel {
    public readonly meetingName: string;    
    public readonly issues: IIssue[];
    public readonly signatureBase64: string;
    public readonly attendees: IAttendees;

    constructor(meetingName: string, issues: IIssue[], signatureBase64: string, attendees: IAttendees) {
        this.meetingName = meetingName;
        this.issues = issues;
        this.signatureBase64 = signatureBase64;
        this.attendees = attendees;
    }
}