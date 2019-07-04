import { IMeetingGateway } from '../../Gateways/MeetingGateway';
import { IMeetingSignOffModel } from '../../Domain/Meeting';
import { ISignOffMeetingUseCase } from '../../Boundary/SignOffMeeting';

export class SignOffMeetingUseCase implements ISignOffMeetingUseCase {
    private readonly gateway: IMeetingGateway;

    constructor(gateway: IMeetingGateway) {
      this.gateway = gateway;
    }

    async Execute(inputModel: IMeetingSignOffModel): Promise<boolean> {
        const response = await this.gateway.signOffMeeting(inputModel);
        return response.successful;
    }
}