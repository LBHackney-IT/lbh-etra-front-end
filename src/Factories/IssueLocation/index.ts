import { IFactory } from "../index";
import { v4 as uuid } from 'uuid';
import { IssueLocation, IIssueLocation, IssueLocationType } from "../../Domain/IssueLocation";
import { IBlockLocation, BlockLocation } from "../../Domain/BlockLocation";
import { IEstateLocation } from "../../Domain/EstateLocation";

export interface IIssueLocationFactory extends IFactory<IIssueLocation>{
    createFromLocationType(issueLocationType: IssueLocationType): IIssueLocation 
    createFromEstateLocation(estateLocation: IEstateLocation): IIssueLocation[]
    createFromBlockLocation(blockLocation: IBlockLocation): IIssueLocation
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
        let issueLocations = new Array<IIssueLocation>();
        //create location from estate
        let estateIssueLocation = new IssueLocation(uuid(),estateLocation.estateName, estateLocation.estateId, "", IssueLocationType.Estate );
        issueLocations.push(estateIssueLocation);
        //create location from blocks
        for(let i = 0; i < estateLocation.blocks.length; i++){
            let blockLocation = this.createFromBlockLocation(estateLocation.blocks[i]);
            issueLocations.push(blockLocation);
        }
        
        return issueLocations;
    }

    public createFromBlockLocation(blockLocation: IBlockLocation): IIssueLocation{
        let blockIssueLocation = new IssueLocation(uuid(),blockLocation.blockName, "", blockLocation.blockId, IssueLocationType.Block );
        return blockIssueLocation;
    }
}