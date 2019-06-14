 export interface IIssueLocation 
{
   estateId: string,
   estateName:string,
   blockLocation:IBlockLocation
} 
export interface IBlockLocation
{
   blockName: string,
   blockId: string,
}

export class BlockLocation implements IBlockLocation {
   public blockName: string;
   public blockId: string;

   public constructor(blockId: string, blockName: string){
      this.blockId = blockId;
      this.blockName = blockName;
   }
}

export class IssueLocation implements IIssueLocation
{
   public estateId: string;
   public estateName: string;
   public blockLocation: IBlockLocation

   public constructor(estateId:string, estateName:string, blockLocation: IBlockLocation){
      
      this.estateId = estateId,
      this.estateName = estateName,
      this.blockLocation = blockLocation
   }
} 



