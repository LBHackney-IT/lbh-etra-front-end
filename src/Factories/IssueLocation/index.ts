import { IFactory } from "../index";
import { v4 as uuid } from 'uuid';
import { IssueLocation, IIssueLocation, IssueLocationType } from "../../Domain/IssueLocation";
import { IEstateLocation } from "../../Domain/EstateLocation";

export interface IIssueLocationFactory extends IFactory<IIssueLocation>{
    createFromLocationType(issueLocationType: IssueLocationType): IIssueLocation 
    createFromEstateLocation(estateLocation: IEstateLocation): IIssueLocation[]
}

export class IssueLocationFactory implements IFactory<IIssueLocation>  {
    public create(): IIssueLocation {
        let id = uuid();
        let location = new IssueLocation(id,"","", "", IssueLocationType.Estate);
        return location;
    }
    public createFromLocationType(issueLocationType: IssueLocationType): IIssueLocation{
        let id = uuid();
        let location = new IssueLocation(id,"","", "", issueLocationType);
        return location;
    }

    public createFromEstateLocation(estateLocation: IEstateLocation): IIssueLocation[]{
        
        let id = uuid();
        let name = estateLocation.estateName.

        let location = new IssueLocation(id,estateLocation.estateName, estateLocation.estateId, undefined, IssueLocationType.Estate );
        return location;
    }
}