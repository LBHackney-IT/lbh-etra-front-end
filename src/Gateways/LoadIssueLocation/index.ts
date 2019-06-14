import {IIssueLocationGateway, ILoadIssuesOutputMeetingModel, LoadIssuesOutputMeetingModel} from '../../Boundary/IssueLocation';
import { IEstateLocation } from '../../Domain/EstateLocation';
import {  IIssueLocation } from '../../Domain/IssueLocation';
import locationsData from "../../JsonFiles/IssueLocation.json";
import { IIssueLocationFactory } from '../../Factories/IssueLocation';

export default class LoadIssueLocationGateway implements IIssueLocationGateway {
    private _estateLocations:Array<IEstateLocation>;
    private _issueLocationFactory:IIssueLocationFactory;

    public constructor(issueLocationFactory:IIssueLocationFactory){
        this._estateLocations = Array.from<IEstateLocation>(locationsData);
        this._issueLocationFactory = issueLocationFactory;
    }

    public loadIssueLocations() : Promise<ILoadIssuesOutputMeetingModel> {
        let issueLocations: IIssueLocation[] = new Array<IIssueLocation>();

        for(let i = 0; i < this._estateLocations.length; i++){
            let estateLocation:IEstateLocation = this._estateLocations[i];
            let estateLocations = this._issueLocationFactory.createFromEstateLocation(estateLocation);
            issueLocations.concat(estateLocations);
        }
        let outputModel = new LoadIssuesOutputMeetingModel(true,  issueLocations);
        return Promise.resolve(outputModel);
    }
}