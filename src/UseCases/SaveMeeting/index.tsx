import { ISaveMeetingInputModel, ISaveMeetingUseCase, ISaveMeetingOutputModel } from '../../Boundary/SaveMeeting';
import { IIssue } from '../../Components/Issues';
import { IMeetingGateway } from '../../Gateways/MeetingGateway';

export class SaveMeetingOutputModel implements ISaveMeetingOutputModel{
    public successful:boolean;
    constructor(successful: boolean){
        this.successful = successful;
    }
}

export class SaveMeetingInputModel implements ISaveMeetingInputModel {
    public issues:Array<IIssue>;
    public signatureBase64: string;
    constructor(issues: Array<IIssue>, signatureBase64: string){
        this.issues = issues;
        this.signatureBase64 = signatureBase64;
    }
}

export class SaveMeetingUseCase implements ISaveMeetingUseCase{
    private readonly gateway: IMeetingGateway;

    constructor(gateway: IMeetingGateway) {
      this.gateway = gateway;
    }

    Execute(inputModel: ISaveMeetingInputModel): ISaveMeetingOutputModel {
        this.gateway.saveMeeting(inputModel);

        return new SaveMeetingOutputModel(true);
    }
}