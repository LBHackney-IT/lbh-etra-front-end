import React from 'react';

export interface IIssue 
{
   IssueType:string
   Notes:string
   LocationOfIssue:string
} 

export class AddIssues extends React.Component<any, any> {
   render(){
      return(
         <div className="AddIssuesHeader">Record Issues at Meeting</div>
         //<form></form>
      )
   };
   
}

export default AddIssues

