import  { IIssueType } from '../IssueType'
import { IIssueLocation } from '../IssueLocation'

export interface IIssue  
{
  IssueType:IIssueType
  Location:IIssueLocation
  Notes:string
}

export class Issue implements IIssue
{
  public IssueType:IIssueType;
  public Location:IIssueLocation;
  public Notes:string;

  constructor(issueType:IIssueType, location:IIssueLocation, notes:string){
    this.IssueType = issueType;
    this.Location = location;
    this.Notes = notes;
  }
}