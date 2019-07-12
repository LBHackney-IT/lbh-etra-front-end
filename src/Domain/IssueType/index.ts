export interface IIssueType 
{
   issueId:string;
   issueType:string;
} 

export class IssueType implements IIssueType
{
   public issueType:string;
   public issueId:string;
   public constructor(issueType:string, issueId:string){
      this.issueType = issueType;
      this.issueId = issueId;
   }
}