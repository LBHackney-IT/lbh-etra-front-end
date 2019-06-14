import { IBlockLocation } from '../BlockLocation';

export interface IEstateLocation {
   estateId: string;
   estateName: string;
   blocks: IBlockLocation[];
}

export class EstateLocation implements IEstateLocation {
   public estateId: string;
   public estateName: string;
   public blocks: IBlockLocation[];
   public constructor(estateId: string, estateName: string, blocks: IBlockLocation[]) {
      this.estateId = estateId;
      this.estateName = estateName;
      this.blocks = blocks;
   }
}