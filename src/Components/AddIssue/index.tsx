import React from 'react';
import { IIssue } from '../Issues';
import './index.css';

export interface IAddIssuesProps
{
  onChangeIssues: (issues: IIssue) => void;
  //  issueType:string;
  //  issueLocation:string;
  //  notes:string;
}

export interface IAddIssueState
{
 issue:IIssue
}



export  class AddIssue extends React.Component<IAddIssuesProps,IAddIssueState> {

    constructor(props:IAddIssuesProps)
    {
      super(props)

      this.state={
       
        issue:{
        IssueType:{ IssueId:"",IssueType:""},
            Location:{ LocationId:"",LocationName:""},
            Notes:""
        }
      }
    }

    deleteIssue=()=>{
    
    }

    handleChangeOfIssue=(event:React.ChangeEvent<HTMLInputElement>): void => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
          issue: { 
              ...this.state.issue,
              [name]: [value]
          }
      });
      
      this.props.onChangeIssues(this.state.issue)

    }

    handleChangeOfIssueNote=(event:React.ChangeEvent<HTMLTextAreaElement>): void => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
          issue: { 
              ...this.state.issue,
              [name]: [value]
          }
      });
     // this.setState({issue: {...this.state.issue, newIssue}});
      this.props.onChangeIssues(this.state.issue)
    }

    render() {
      return (
        <form>
          <div><h4>Record issues at the meeting</h4></div>
          <p>Issue Type</p>
          <input type="text" id="issue-type"  required onChange={ (e) => this.handleChangeOfIssue(e) } />
          <p>Location</p>
          <input type="text" id="location"  required onChange={ (e) => this.handleChangeOfIssue(e) }/>
          <div><p>Issue Notes</p></div>
          <textarea id="issue-note" onChange={ (e) => this.handleChangeOfIssueNote(e) }/>
          <button className="button btn-primary btn-stacked" id="delete-issue" onClick={this.deleteIssue}>Delete Issue</button>
        </form>
      );
    }
  }

  export default AddIssue;
  