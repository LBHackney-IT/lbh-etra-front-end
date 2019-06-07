export interface IMeetingGateway {
    saveMeeting: (data: string) => Promise<void>;
}

export default class MeetingGateway implements IMeetingGateway {

    public async saveMeeting(data: string): Promise<void> {
        return await localStorage.setItem("currentMeeting", data);
    }
}
