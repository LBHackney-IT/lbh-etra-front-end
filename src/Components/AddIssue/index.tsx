import React, { ChangeEvent } from 'react';
import { IIssue, Issue } from '../../Domain/Issues';
import './index.css';
import issueTypesData from "../../JsonFiles/IssueType.json"
import {IIssueType} from "../../Domain/IssueType"
import { IIssueLocation } from "../../Domain/IssueLocation";
import {IIssueLocationGateway as ILoadIssueLocationGateway} from '../../Boundary/IssueLocation/'
import { IServiceProvider, ServiceContext } from '../../ServiceContext';
import { v4 as uuid } from 'uuid';

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
    public static contextType = ServiceContext;

    private _issueTypes = Array.from<IIssueType>(issueTypesData);
    private _issueLocations = new Array<IIssueLocation>();
    private _issueLoadLocationGateway: ILoadIssueLocationGateway;

    public constructor(props:IAddIssuesProps, context: IServiceProvider)
    {
      super(props);
      this._issueLoadLocationGateway = context.get<ILoadIssueLocationGateway>("ILoadIssueLocationGateway");
      
      debugger;

      this._issueLoadLocationGateway.loadIssueLocations().then((data)=>{
        console.log("loadIssueLocations promise resolved");
        debugger;
        this._issueLocations = data.issueLocations;
        this.setState({issueLocations:data.issueLocations});
      });
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
      debugger;
      const value = event.target.value;
      this.setState({
        issue: { 
            ...this.state.issue,
            Notes: value
        }
      });

      this.props.onChangeIssue(this.state.issue, this.props.index);
    }

    handleChangeOfIssueTypeDropDownList=(event:React.ChangeEvent<HTMLSelectElement>): void => {
      console.log("handleChangeOfIssueTypeDropDownList");
      debugger;
      const index = Number(event.target.value);
      let issueType = this.state.issueTypes[index];
      let issue = this.state.issue;
      issue.IssueType = issueType;
      this.setState({issue:issue});

      this.props.onChangeIssue(this.state.issue, this.props.index);
    }

    handleChangeOfIssueLocationDropDownList=(event:React.ChangeEvent<HTMLSelectElement>): void => {
      console.log("handleChangeOfIssueLocationDropDownList");
      debugger;
      const index = Number(event.target.value);
      let location = this.state.issueLocations[index];
      this.setState({
        issue: { 
          ...this.state.issue,
          Location:location
        }
      });

      this.props.onChangeIssue(this.state.issue, this.props.index);
    }

    createSelectItemsForIssueTypes() {
      let items = [];         
      for (let i = 0; i < this.state.issueTypes.length ; i++) {
        let issueType = this.state.issueTypes[i];
        items.push(<option key={issueType.key} value={i}>{issueType.IssueType}</option>);
      }
      return items;
    } 
    createSelectItemsForIssueLocations() {
      let locationitems = [];         
      for (let i = 0; i < this.state.issueLocations.length ; i++) {
        let issueLocation = this.state.issueLocations[i];
        locationitems.push(<option key={issueLocation.key} value={i}>{issueLocation.name}</option>);    
      }
      return locationitems;
    } 


    render() {
      return (
        <div>
          <div>{this.props.index}</div>
          <div><h4>Record issues at the meeting</h4></div>
          <p>Issue Type</p>
          <select onChange={this.handleChangeOfIssueTypeDropDownList} name="IssueType" >
            {this.createSelectItemsForIssueTypes()}
          </select>

          <p>Issue Location</p>
          <select onChange={this.handleChangeOfIssueLocationDropDownList} name="IssueLocation" >
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
