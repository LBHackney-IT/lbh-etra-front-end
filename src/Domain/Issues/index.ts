import  { IIssueTypeAndId, IssueTypeAndKey } from '../IssueType'
import { IIssueLocation } from '../IssueLocation'

export interface IIssue  
{
  Id: string
  IssueTypeAndKey:IssueTypeAndKey
  Location:IIssueLocation
  Notes:string
}

export class Issue implements IIssue
{
  public Id:string;
  public IssueTypeAndKey:IssueTypeAndKey;
  public Location:IIssueLocation;
  public Notes:string;

  constructor(id: string, issueType:IssueTypeAndKey, location:IIssueLocation, notes:string){
    this.Id = id;
    this.IssueTypeAndKey = issueType;
    this.Location = location;
    this.Notes = notes;
  }
}