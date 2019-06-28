export interface IArea
{
   id: number;
   name: string;
   patches: IPatch[];
}

export interface IPatch {
    patchId: string;
    officerName: string;
    id: string;
    tras: ITra[];
}

export interface ITra {
    id: number;
    name: string;
    blocks: IBlock[];
}

export interface IBlock {
    name: string
}