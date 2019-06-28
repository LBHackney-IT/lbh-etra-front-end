import  { IIssueType } from '../IssueType'
import { IBlock } from '../Area';

export interface IIssue  
{
  Id: string
  IssueType: IIssueType
  Location: IBlock
  Notes:string
}

export class Issue implements IIssue
{
  public Id:string;
  public IssueType:IIssueType;
  public Location: IBlock;
  public Notes:string;

  constructor(id: string, issueType: IIssueType, location: IBlock, notes:string){
    this.Id = id;
    this.IssueType = issueType;
    this.Location = location;
    this.Notes = notes;
  }
}