import React, { ChangeEvent } from 'react';
import { IIssue, Issue } from '../../Domain/Issues';
import './index.css';
import issueTypesData from "../../JsonFiles/IssueType.json"
import locationsData from "../../JsonFiles/IssueLocation.json"
import {IssueType} from "../../Domain/IssueType"
import { IIssueLocation, IssueLocation } from "../../Domain/IssueLocation";
import {IIssueType} from "../../Domain/IssueType"

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
const locations = Array.from<IIssueLocation>(locationsData)


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
      const value = event.target.value
      this.setState({
        issue: { 
          ...this.state.issue,
          IssueType: {
            IssueId:"",
            IssueType:value
          }
        }
      })

      this.props.onChangeIssue(this.state.issue, this.props.index)
    }
    handleChangeOfLocationDropDownList = (event: ChangeEvent<HTMLSelectElement>): void => {
      const value = event.target.value
      this.setState({
        issue: { 
          ...this.state.issue,
          Location: {
            estateId: "",
            estateName:value,
             blockLocation:{
              blockName: "",
              blockId: "",
             }
          }
        }
      })

      this.props.onChangeIssue(this.state.issue, this.props.index)
    }

    renderIssueType(issueType: IssueType, index: number) {
      return (
        <option key={index} value={issueType.IssueType}>{issueType.IssueType}</option>
      );
    }

    renderLocation(location: IssueLocation, index: number) {
      return (
        <option key={index} value={location.estateName}>{location.estateName}</option>
      );
    }

    render() {
      return (
        <div>
          <div><h4>Record issues at the meeting</h4></div>
          <p>Issue Type</p>
          <select onChange={this.handleChangeOfIssueDropDownList} value={this.state.issue.IssueType.IssueType}>
            {issueTypes.map(this.renderIssueType)}
          </select>
           <p>Location</p>
          <select onChange={this.handleChangeOfLocationDropDownList} value={this.state.issue.Location.estateName}>
            <option>other</option>
            {locations.map(this.renderLocation)}
          </select> 
          <div><p>Issue Notes</p></div>
          <textarea id="issue-note" value={this.state.issue.Notes} onChange={this.handleChangeOfIssueNote }/>
          <button id="delete-issue" className="button btn-primary btn-stacked" data-test="delete-issue" onClick={this.deleteIssue.bind(this)}>Delete Issue</button>
          <div>{this.state.issue.Notes}</div>
          <div>{this.state.issue.IssueType.IssueType}</div>
          <div>{this.state.issue.Location.estateName}</div>
        </div>
      );
    }
  }

  export default AddIssue;
