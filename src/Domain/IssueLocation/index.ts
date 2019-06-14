import {IBlockLocation} from '../BlockLocation'
import { IIssueLocation } from './index';

export interface IIssueLocation 
{
   estateId: string,
   estateName:string,
   blockLocation:IBlockLocation
} 

export class IssueLocation implements IIssueLocation {
   public estateId: string;
   public estateName: string;
   public blockLocation: IBlockLocation;
   public constructor(estateId: string, estateName: string, blockLocation: IBlockLocation) {
        this.estateId = estateId;
        this.estateName = estateName;
        this.blockLocation = blockLocation;
   }
}