import React from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';

export interface IAddIssuesProps
{
  onChangeIssues: (issues: IIssue) => void;
  onDeleteIssue: (index:number) => void;
  index:number;
  //  issueType:string;
  //  issueLocation:string;
  //  notes:string;
  issue:IIssue;
}

export interface IAddIssueState
{
  issue:IIssue;
  index:number;
}

export class AddIssue extends React.Component<IAddIssuesProps,IAddIssueState> {

    constructor(props:IAddIssuesProps)
    {
      super(props);

      this.state={
        issue:props.issue,
        index:props.index
      }
    }

    deleteIssue(){
      console.log(`delete issues:${this.props.index}`)
      this.props.onDeleteIssue(this.props.index);
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
      let issue = this.state.issue;
      issue.Notes = value;
      this.setState({issue:issue});
      this.props.onChangeIssues(this.state.issue)
    }

    render() {
      return (
        <div>
          <div>{this.state.index}</div>
          <div><h4>Record issues at the meeting</h4></div>
          <p>Issue Type</p>
          <input type="text" id="issue-type"  onChange={ (e) => this.handleChangeOfIssue(e) } />
          <p>Location</p>
          <input type="text" id="location"  onChange={ (e) => this.handleChangeOfIssue(e) }/>
          <div><p>Issue Notes</p></div>
          <textarea id="issue-note" value={this.state.issue.Notes} onChange={ (e) => this.handleChangeOfIssueNote(e) }/>
          <button id="delete-issue" className="button btn-primary btn-stacked" data-test="delete-issue" onClick={this.deleteIssue.bind(this)}>Delete Issue</button>
        </div>
      );
    }
  }

  export default AddIssue;
