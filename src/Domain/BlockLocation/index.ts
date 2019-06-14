import {IBlockLocation} from './'

export interface IBlockLocation
{
   blockName: string,
   blockId: string,
}

export class BlockLocation implements IBlockLocation {
   public blockName: string;
   public blockId: string;
   public constructor(blockId: string, blockName: string) {
      this.blockId = blockId;
      this.blockName = blockName;
   }
}