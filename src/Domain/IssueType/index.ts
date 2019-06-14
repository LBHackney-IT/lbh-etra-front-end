import { v4 as uuid } from 'uuid';

export interface IIssueType 
{
   key:any;
   IssueId:string;
   IssueType:string;
} 

export class IssueType implements IIssueType
{
   public key:any;
   public IssueId:string;
   public IssueType:string;
   public constructor(issueType:string, issueId:string){
      this.key = uuid();
      this.IssueType = issueType;
      this.IssueId = issueId;
   }
}