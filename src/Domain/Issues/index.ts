import  { IIssueType } from '../IssueType'
import { IBlock } from '../Area';

export interface IIssue  
{
  id: string
  issueType: IIssueType
  location: IBlock
  notes:string
}

export class Issue implements IIssue
{
  public id:string;
  public issueType:IIssueType;
  public location: IBlock;
  public notes:string;

  constructor(id: string, issueType: IIssueType, location: IBlock, notes:string){
    this.id = id;
    this.issueType = issueType;
    this.location = location;
    this.notes = notes;
  }
}