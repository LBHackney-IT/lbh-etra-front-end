import { ISaveMeetingDraftUseCase } from '../../Boundary/SaveMeetingDraft';
import { IMeetingGateway } from '../../Gateways/MeetingGateway';
import { IMeetingModel } from '../../Domain/Meeting';

export class SaveMeetingDraftUseCase implements ISaveMeetingDraftUseCase{
    private readonly gateway: IMeetingGateway;

    constructor(gateway: IMeetingGateway) {
      this.gateway = gateway;
    }

    Execute(inputModel: IMeetingModel): boolean {
        this.gateway.saveMeetingDraft(inputModel);
        return true;
    }
}