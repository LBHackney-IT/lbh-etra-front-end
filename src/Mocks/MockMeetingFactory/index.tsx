import faker from "faker";
import { IIssue } from "../../Domain/Issues";
import { IAttendees } from "../../Domain/Attendees";
import { ISignOff } from "../../Domain/SignOff";
import { IMeetingModel } from "../../Domain/Meeting";

export function mockIssues(amount?: number): Array<IIssue> {
    const totalIssues = amount || faker.random.number(10);
    const arrayOfIssues: Array<IIssue> = [];

    for (let i = 0; i < totalIssues; i++) {
        arrayOfIssues.push(mockIssue());
    }

    return arrayOfIssues;
}

export function mockIssue(): IIssue {
    return {
        "Id": faker.random.uuid(),
        "IssueType": {
            "IssueId": faker.random.alphaNumeric(),
            "IssueType": faker.random.words()
        },
        "Location": {
            "name": faker.address.streetAddress(),
        },
        "Notes": faker.random.words(30)
    }
}

export function mockAttendees(): IAttendees {
    return {
        Councillors: listOfNames(),
        HackneyStaff: listOfNames(),
        NumberOfAttendees: faker.random.number()
    }
}

function listOfNames(): string {
    const number = faker.random.number(10);
    let names = "";

    for (let i = 0; i < number; i++) {
        names += `${faker.name.findName()}, `
    }

    return names;
}

export function mockSignOff(): ISignOff {
    return {
        signature: faker.image.dataUri(),
        role: faker.random.word(),
        name: faker.name.findName()
    }
}

export function mockMeeting(meetingName: string): IMeetingModel {
    return {
        id: faker.random.uuid(),
        traId: faker.random.number(10),
        meetingName: meetingName,
        issues: mockIssues(),
        meetingAttendance: mockAttendees(),
        signOff: mockSignOff(),
        isSignedOff: false
    }
}