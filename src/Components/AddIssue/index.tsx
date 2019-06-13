import React, { LiHTMLAttributes } from 'react';
import { IIssue } from '../Issues';
import './index.css';
import issuesData from '../../JsonFiles/IssueType.json'
import locationData from '../../JsonFiles/IssueLocation.json'

import { string } from 'prop-types';
import { IIssueType } from '../IssueType';
import { ILocation } from '../Location';

export interface ILocation 
{
   estateId:string,
   estateName:string,
   blocks:ILocationBlock
} 

export interface ILocationBlock
{
   blockName:string,
   blockId: string,
   estateId:string,
   estateName:string
}
export interface IAddIssuesProps
{
  onChangeIssues: (issues: IIssue) => void;
}

export interface IAddIssueState
{
 issue:IIssue
}

const issueType = Array.from<IIssueType>(issuesData)
const location = Array.from<ILocation>(locationData)

export  class AddIssue extends React.Component<IAddIssuesProps,IAddIssueState> {

    constructor(props:IAddIssuesProps)
    {
      super(props)

      this.state = {
        issue:{
          IssueType:"",
          Location:"",
          Notes:""
        }
      }
    }

  
    deleteIssue=() => {
    
    }
    handleChangeOfIssue1=(event:React.ChangeEvent<HTMLTextAreaElement>): void => {
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

    renderIssueType(issueType: IIssueType, index: number) {
      return (
        <option key={index} value={issueType.IssueType}>{issueType.IssueType}</option>
      );
    }
    renderLocation(location: ILocation, index: number) {
      return (
        <option key={index} value={location.estateName}>{location.estateName}</option>
      );
    }
    
    renderBlock(locationBlock:ILocationBlock){

    }

    render() {
      return (
        <form>
          <div><h4>Record issues at the meeting</h4></div>
          <div>Issue Types</div>
          <select onSelect={this.handleChangeOfIssueDropDownList} value={this.state.issue.IssueType} name="IssueType">
            {issueType.map(this.renderIssueType)}
          </select> 
          <div>Location</div>
          <select onSelect={this.handleChangeOfIssueDropDownList} value={this.state.issue.Location} name="IssueType">
            {location.map(this.renderLocation)}
          </select> 
          {/* <p>Location</p>
          <input type="text" id="location"  required onChange={this.handleChangeOfIssue2 }value={this.state.issue.Location} name="Location"/> */}
          <div>Issue Notes</div>
          <textarea id="issue-note"  value={this.state.issue.Notes} name="Notes" onChange={this.handleChangeOfIssue1 } />
          <button className="button btn-primary btn-stacked" id="delete-issue" onClick={this.deleteIssue} name="Location" >Delete Issue</button>
          <div>{this.state.issue.IssueType}</div>
          <div>{this.state.issue.Location}</div>
          <div>{this.state.issue.Notes}</div>
        </form>
      );
    }
  }

  export default AddIssue;
  