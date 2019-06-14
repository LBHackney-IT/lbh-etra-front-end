import React, { ChangeEvent } from 'react';
import { IIssue, Issue } from '../../Domain/Issues';
import './index.css';
import issueTypesData from "../../JsonFiles/IssueType.json"
import locationsData from "../../JsonFiles/IssueLocation.json"
import {IssueType} from "../../Domain/IssueType"
import { IIssueLocation } from "../../Domain/IssueLocation";

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

const issueTypes = Array.from<IssueType>(issueTypesData)
const locations = Array.from<IIssueLocation>(issueTypesData)

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

    // handleChangeOfIssue = (event: ChangeEvent<HTMLInputElement>): void => {
    //   const name = event.target.name;
    //   const value = event.target.value;
    //   this.setState({
    //       issue: { 
    //           ...this.state.issue,
    //           [name]: [value]
    //       }
    //   });
      
    //   this.props.onChangeIssue(this.state.issue, this.props.index)
    // }

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

    handleChangeOfIssueDropDownList = (event: ChangeEvent<HTMLSelectElement>): void => {
      const name = event.target.name;
      const value = event.target.value
      this.setState({
         
      })
      //this.props.onSelectIssue(this.state.issue)
    }

    createSelectItemsForIssues() {
      let items = [];         
      for (let i = 0; i <= issueTypes.length -1 ; i++) {
           items.push(<option key={i} value={issueTypes[i].IssueType}>{issueTypes[i].IssueType}</option>);
      }
      return items;
    } 


    render() {
      return (
        <div>
          <div>{this.props.index}</div>
          <div><h4>Record issues at the meeting</h4></div>
          <p>Issue Type</p>
          <select onSelect={this.handleChangeOfIssueDropDownList} value={this.state.issue.IssueType.IssueType} name="IssueType" >
            {this.createSelectItemsForIssues()}
          </select>
          {/* <input type="text" id="issue-type" onChange={this.handleChangeOfIssue} />
          <p>Location</p>
          <input type="text" id="location" name="" onChange={this.handleChangeOfIssue}/> */}
          <div><p>Issue Notes</p></div>
          <textarea id="issue-note" value={this.state.issue.Notes} onChange={this.handleChangeOfIssueNote }/>
          <button id="delete-issue" className="button btn-primary btn-stacked" data-test="delete-issue" onClick={this.deleteIssue.bind(this)}>Delete Issue</button>
        </div>
      );
    }
  }

  export default AddIssue;
