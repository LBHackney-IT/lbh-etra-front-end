import React, { LiHTMLAttributes } from 'react';
import { IIssue } from '../Issues';
import './index.css';
import issuesData from '../../JsonFiles/IssueType.json'
import locationData from '../../JsonFiles/IssueLocation.json'

import { string } from 'prop-types';
import { IIssueType } from '../IssueType';
import { ILocation } from '../Location';

export interface IAddIssuesProps
{
  onChangeIssues: (issues: IIssue) => void;
  issueType:string;
  issueLocation:string;
  notes:string;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface IAddIssueState
{
 issue:IIssue
 issueTypes: IIssueType[]
 location: ILocation[]
}


export  class AddIssue extends React.Component<IAddIssuesProps,IAddIssueState> {

    constructor(props:IAddIssuesProps)
    {
      super(props)

      this.state = {
        issue:{
          IssueType:"",
          Location:"",
          Notes:""
        },
        issueTypes: Array.from<IIssueType>(issuesData),
        location: Array.from<ILocation>(locationData)
      }
    }
  
    deleteIssue=() => {
    
    }
    handleChangeOfNotes=(event:React.ChangeEvent<HTMLTextAreaElement>): void => {
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

    handleChangeOfIssueDropDownList=(event:React.ChangeEvent<HTMLSelectElement>): void => {
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
    createSelectItemsForIssues() {
      let items = [];         
      for (let i = 0; i <= this.state.issueTypes.length -1 ; i++) {
           items.push(<option key={i} value={this.state.issueTypes[i].IssueType}>{this.state.issueTypes[i].IssueType}</option>);
      }
      return items;
    } 
    createSelectItemsForLocation() {
      let locationitems = [];         
      for (let i = 0; i <= this.state.location.length -1 ; i++) {
           locationitems.push(<option key={i} value={this.state.location[i].LocationName}>{this.state.location[i].LocationName}</option>);
      }
      return locationitems;
    } 

    render() {
      return (
        <form>
          <div><h4>Record issues at the meeting</h4></div>
          <div>Issue Types</div>
          <select onSelect={this.handleChangeOfIssueDropDownList} value={this.state.issue.IssueType} name="IssueType">
            {this.createSelectItemsForIssues()}
          </select> 
          <div>Location</div>
          <select onSelect={this.handleChangeOfIssueDropDownList} value={this.state.issue.Location} name="IssueType">
            {this.createSelectItemsForLocation()}
          </select> 
          {/* <p>Location</p>
          <input type="text" id="location"  required onChange={this.handleChangeOfIssue2 }value={this.state.issue.Location} name="Location"/> */}
          <div>Issue Notes</div>
          <textarea id="issue-note"  value={this.state.issue.Notes} name="Notes" onChange={this.handleChangeOfNotes } />
          <button className="button btn-primary btn-stacked" id="delete-issue" onClick={this.deleteIssue} name="Location" >Delete Issue</button>
          <div>{this.state.issue.IssueType}</div>
          <div>{this.state.issue.Location}</div>
          <div>{this.state.issue.Notes}</div>
        </form>
      );
    }
  }

  export default AddIssue;
  