import { IMeetingGateway } from '../../Gateways/MeetingGateway';
import { IMeetingModel } from '../../Domain/Meeting';
import { IGetMeetingDraftsUseCase } from '../../Boundary/GetMeetingDrafts';

export class GetMeetingDraftsUseCase implements IGetMeetingDraftsUseCase {
    private readonly gateway: IMeetingGateway;

    constructor(gateway: IMeetingGateway) {
      this.gateway = gateway;
    }

    async Execute(): Promise<Array<IMeetingModel>> {
        return await this.gateway.getMeetingDrafts();
    }
}