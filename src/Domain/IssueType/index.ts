import { v4 as uuid } from 'uuid';

export interface IIssueType 
{
   IssueId:string;
   IssueType:string;
} 

export interface IssueTypeAndKey
{
   key:any;
   IssueType:IIssueType
}


export class IssueType implements IssueTypeAndKey
{
   public key:any;
   public IssueType:IIssueType;
   public constructor(issueType:IIssueType){
      this.key = uuid();
      this.IssueType = issueType;
   }
}