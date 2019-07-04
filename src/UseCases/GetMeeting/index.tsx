import { IMeetingGateway } from '../../Gateways/MeetingGateway';
import { IMeetingModel } from '../../Domain/Meeting';
import { IGetMeetingUseCase } from '../../Boundary/GetMeeting';

export class GetMeetingUseCase implements IGetMeetingUseCase {
    private readonly gateway: IMeetingGateway;

    constructor(gateway: IMeetingGateway) {
      this.gateway = gateway;
    }

    async Execute(): Promise<IMeetingModel | undefined> {
        const result = await this.gateway.getMeetingData();
        return result.meeting;
    }
}