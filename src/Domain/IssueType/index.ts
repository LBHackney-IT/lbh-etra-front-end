import { v4 as uuid } from 'uuid';

export interface IIssueTypeAndId 
{
   IssueId:string;
   IssueType:string;
} 

export interface IssueTypeAndKey
{
   key:any;
   IssueTypeAndId:IIssueTypeAndId
}


export class IssueType implements IssueTypeAndKey
{
   public key:any;
   public IssueTypeAndId:IIssueTypeAndId;
   public constructor(issueType:IIssueTypeAndId){
      this.key = uuid();
      this.IssueTypeAndId = issueType;
   }
}