export interface IIssueType 
{
   IssueId:string;
   IssueType:string;
} 

export class IssueType implements IIssueType
{
   public IssueType:string;
   public IssueId:string;
   public constructor(issueType:string, issueId:string){
      this.IssueType = issueType;
      this.IssueId = issueId;
   }
}