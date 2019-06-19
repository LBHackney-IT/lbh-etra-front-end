import  { IIssueType, IssueTypeAndKey } from '../IssueType'
import { IIssueLocation } from '../IssueLocation'

export interface IIssue  
{
  Id: string
  IssueType:IssueTypeAndKey
  Location:IIssueLocation
  Notes:string
}

export class Issue implements IIssue
{
  public Id:string;
  public IssueType:IssueTypeAndKey;
  public Location:IIssueLocation;
  public Notes:string;

  constructor(id: string, issueType:IssueTypeAndKey, location:IIssueLocation, notes:string){
    this.Id = id;
    this.IssueType = issueType;
    this.Location = location;
    this.Notes = notes;
  }
}