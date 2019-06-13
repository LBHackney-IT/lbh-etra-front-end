import React, { ChangeEvent } from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';

export interface IAddIssuesProps
{
  onChangeIssue: (issue: IIssue, index: number) => void;
  onDeleteIssue: (index:number) => void;
  index: number;
  issue: IIssue;
}

export interface IAddIssueState
{
  issue:IIssue;
}

export class AddIssue extends React.Component<IAddIssuesProps,IAddIssueState> {

    constructor(props:IAddIssuesProps)
    {
      super(props);

      this.state={
        issue: this.props.issue
      }
    }
    deleteIssue(){
      this.props.onDeleteIssue(this.props.index);
    }

    handleChangeOfIssue = (event: ChangeEvent<HTMLInputElement>): void => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({
          issue: { 
              ...this.state.issue,
              [name]: [value]
          }
      });
      
      this.props.onChangeIssue(this.state.issue, this.props.index)
    }

    handleChangeOfIssueNote=(event: ChangeEvent<HTMLTextAreaElement>): void => {
      const value = event.target.value;
      this.setState({
        issue: { 
            ...this.state.issue,
            Notes: value
        }
      });

      this.props.onChangeIssue(this.state.issue, this.props.index)
    }

    render() {
      return (
        <div>
          <div>{this.props.index}</div>
          <div><h4>Record issues at the meeting</h4></div>
          <p>Issue Type</p>
          <input type="text" id="issue-type" onChange={this.handleChangeOfIssue} />
          <p>Location</p>
          <input type="text" id="location" name="" onChange={this.handleChangeOfIssue}/>
          <div><p>Issue Notes</p></div>
          <textarea id="issue-note" value={this.state.issue.Notes} onChange={this.handleChangeOfIssueNote }/>
          <button id="delete-issue" className="button btn-primary btn-stacked" data-test="delete-issue" onClick={this.deleteIssue.bind(this)}>Delete Issue</button>
        </div>
      );
    }
  }

  export default AddIssue;
