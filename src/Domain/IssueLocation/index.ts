export enum IssueLocationType{
   Estate,
   Block,
   Other,
}

export interface IIssueLocation 
{
   key: string,
   name: string,
   estateId:string,
   blockId?: string,
   locationType: IssueLocationType
} 

export class IssueLocation implements IIssueLocation {
   public key: string;
   public estateId: string;
   public blockId: string;
   public name: string;
   public locationType: IssueLocationType;
   public constructor(key: string, name: string, estateId: string, blockId:string, locationType: IssueLocationType) {
      this.key = key;
      this.estateId = estateId;
      this.blockId = blockId;
      this.name = name;
      this.locationType = locationType;
   }
}