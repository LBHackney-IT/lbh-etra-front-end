import { IMeetingGateway } from '../../Gateways/MeetingGateway';
import { IMeetingModel, IUnreviewedMeetingModel } from '../../Domain/Meeting';
import { ICreateMeetingUseCase } from '../../Boundary/CreateMeeting';

export class CreateMeetingUseCase implements ICreateMeetingUseCase {
    private readonly gateway: IMeetingGateway;

    constructor(gateway: IMeetingGateway) {
      this.gateway = gateway;
    }

    async Execute(inputModel: IMeetingModel | IUnreviewedMeetingModel): Promise<boolean> {
        const response = await this.gateway.saveMeetingData(inputModel);
        return response.successful;
    }
}