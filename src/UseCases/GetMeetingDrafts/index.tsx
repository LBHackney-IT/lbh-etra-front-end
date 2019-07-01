import { IMeetingGateway } from '../../Gateways/MeetingGateway';
import { IMeetingModel } from '../../Domain/Meeting';
import { IGetMeetingDrafts } from '../../Boundary/GetMeetingDrafts';

export class GetMeetingDraftsUseCase implements IGetMeetingDrafts {
    private readonly gateway: IMeetingGateway;

    constructor(gateway: IMeetingGateway) {
      this.gateway = gateway;
    }

    async Execute(): Promise<Array<IMeetingModel>> {
        return await this.gateway.getMeetingDrafts();
    }
}