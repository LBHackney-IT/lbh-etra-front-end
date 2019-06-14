import React, { ChangeEvent } from 'react';
import { IIssue, Issue } from '../../Domain/Issues';
import './index.css';
import issueTypesData from "../../JsonFiles/IssueType.json"

import {IIssueType, IssueType} from "../../Domain/IssueType"
import { IIssueLocation } from "../../Domain/IssueLocation";

export interface IAddIssuesProps
{
  onChangeIssue: (issues: IIssue, index: number) => void;
  onDeleteIssue: (index: number) => void;
  issue:IIssue;
  index: number;
}

export interface IAddIssueState
{
  issue:IIssue;
  issueTypes: IIssueType[];
  issueLocations: IIssueLocation[];
}

export class AddIssue extends React.Component<IAddIssuesProps,IAddIssueState> {
    private _issueTypes = Array.from<IssueType>(issueTypesData)
    private _issueLocations = Array.from<IIssueLocation>(issueTypesData)

    public constructor(props:IAddIssuesProps)
    {
      super(props);
      this.state={
        issue: this.props.issue,
        issueTypes: this._issueTypes,
        issueLocations: this._issueLocations,
      }
    }

    deleteIssue = (): void => {
      this.props.onDeleteIssue(this.props.index);
    }

    handleChangeOfIssueNote=(event: ChangeEvent<HTMLTextAreaElement>): void => {
      const value = event.target.value;
      this.setState({
        issue: { 
            ...this.state.issue,
            Notes: value
        }
      });

      this.props.onChangeIssue(this.state.issue, this.props.index);
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

      this.props.onChangeIssue(this.state.issue, this.props.index);
    }

    createSelectItemsForIssueTypes() {
      let items = [];         
      for (let i = 0; i <= this.state.issueTypes.length -1 ; i++) {
           items.push(<option key={i} value={this.state.issueTypes[i].IssueId}>{this.state.issueTypes[i].IssueType}</option>);
      }
      return items;
    } 
    createSelectItemsForIssueLocations() {
      let locationitems = [];         
      for (let i = 0; i <= this.state.issueLocations.length -1 ; i++) {
        let issueLocation = this.state.issueLocations[i];
        locationitems.push(<option key={issueLocation.key} value={issueLocation.name}>{issueLocation.name}</option>);    
      }
      return locationitems;
    } 
 


    render() {
      return (
        <div>
          <div>{this.props.index}</div>
          <div><h4>Record issues at the meeting</h4></div>
          <p>Issue Type</p>
          <select onSelect={this.handleChangeOfIssueDropDownList} value={this.state.issue.IssueType.IssueType} name="IssueType" >
            {this.createSelectItemsForIssueTypes()}
          </select>

          <p>Issue Location</p>
          <select onSelect={this.handleChangeOfIssueDropDownList} value={this.state.issue.IssueType.IssueType} name="IssueLocation" >
            {this.createSelectItemsForIssueLocations()}
          </select>
          <div><p>Issue Notes</p></div>
          <textarea id="issue-note" value={this.state.issue.Notes} onChange={this.handleChangeOfIssueNote }/>
          <button id="delete-issue" className="button btn-primary btn-stacked" data-test="delete-issue" onClick={this.deleteIssue}>Delete Issue</button>
        </div>
      );
    }
  }

  export default AddIssue;
