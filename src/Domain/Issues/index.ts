import  { IIssueType } from '../IssueType'
import { IIssueLocation } from '../IssueLocation'

export interface IIssue  
{
  Id: string
  IssueType:IIssueType
  Location:IIssueLocation
  Notes:string
}

export class Issue implements IIssue
{
  public Id:string;
  public IssueType:IIssueType;
  public Location:IIssueLocation;
  public Notes:string;

  constructor(id: string, issueType:IIssueType, location:IIssueLocation, notes:string){
    this.Id = id;
    this.IssueType = issueType;
    this.Location = location;
    this.Notes = notes;
  }
}