export interface IBlockLocation
{
   blockName: string;
   blockId: string;
   estateName?: string;
   estateId: string;
}

export class BlockLocation implements IBlockLocation {
   public blockName: string;
   public blockId: string;
   public estateName?: string;
   public estateId: string;
   public constructor(blockId: string, blockName: string, estateName: string, estateId: string) {
      this.blockId = blockId;
      this.blockName = blockName;
      this.estateName = estateName;
      this.estateId = estateId;
   }
}