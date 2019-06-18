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
      this.loadIssueLocations();
      this.state={
        issue: this.props.issue,
        issueTypes: this._issueTypes,
        issueLocations: this._issueLocations,
      }
    }

    loadIssueLocations() {
      this._issueLoadLocationGateway.loadIssueLocations().then((data) => {
        this._issueLocations = data.issueLocations;
        this.setState({ issueLocations: data.issueLocations });
        let issue = this.state.issue;
        issue.Location = this.state.issueLocations[0];
        this.setState({ issue: issue });
      });
    }

    deleteIssue = (): void => {
      this.props.onDeleteIssue(this.props.index);
    }

    handleChangeOfIssueNote=(event: ChangeEvent<HTMLTextAreaElement>): void => {
      const value = event.target.value;

      let issue = this.state.issue;
      issue.Notes = value;
      this.setState({issue:issue});

      this.props.onChangeIssue(this.state.issue, this.props.index);
      console.log(this.state.issue);
    }

    handleChangeOfIssueTypeDropDownList=(event:React.ChangeEvent<HTMLSelectElement>): void => {
      console.log("handleChangeOfIssueTypeDropDownList");
      
      const index = Number(event.target.value);
      let issueType = this.state.issueTypes[index];
      let issue = this.state.issue;
      issue.IssueType = issueType;
      this.setState({issue:issue});

      this.props.onChangeIssue(this.state.issue, this.props.index);
      console.log(issue);
    }

    handleChangeOfIssueLocationDropDownList=(event:React.ChangeEvent<HTMLSelectElement>): void => {
      console.log("handleChangeOfIssueLocationDropDownList");
      
      const index = Number(event.target.value);
      let location = this.state.issueLocations[index];

      let issue = this.state.issue;
      issue.Location = location;
      this.setState({issue:issue });

      this.props.onChangeIssue(this.state.issue, this.props.index);
      console.log(this.state.issue);
    }

    createSelectItemsForIssueTypes() {
      let items = [];         
      for (let i = 0; i < this.state.issueTypes.length ; i++) {
        let issueType = this.state.issueTypes[i];
        items.push(<option className="issues-options" key={i} value={i}>{issueType.IssueType}</option>);
      }
      return items;
    } 
    createSelectItemsForIssueLocations() {
      let locationitems = [];         
      for (let i = 0; i < this.state.issueLocations.length ; i++) {
        let issueLocation = this.state.issueLocations[i];
        locationitems.push(<option className="location-options" key={issueLocation.key} value={i}>{issueLocation.name}</option>);    
      }
      return locationitems;
    } 

    renderFirstOption(text: string){
      return (<option value="" disabled hidden>{text}</option>)
    }


    render() {
      return (
        <div>
          <div data-test="issues-header"><h4>Record issues at the meeting</h4></div>
          <label data-test="issues-label">Issue Type</label>
          <select data-test="issue-type-dropdown" onChange={this.handleChangeOfIssueTypeDropDownList} name="IssueType" value={this.state.issue.IssueType.IssueType}>
            {this.renderFirstOption("Select Issue Type")}
            {this.createSelectItemsForIssueTypes()}
          </select>

          <label data-test="location-label">Issue Location</label>
          <select data-test="location-dropdown" defaultValue={undefined} onChange={this.handleChangeOfIssueLocationDropDownList} name="IssueLocation">
            {this.renderFirstOption("Select Location")}
            {this.createSelectItemsForIssueLocations()}
          </select>
          <div><p>Issue Notes</p></div>
          <textarea className="note" data-test="notes" id="issue-note" value={this.state.issue.Notes} onChange={this.handleChangeOfIssueNote } name= "notes"/>
          <button id="delete-issue" className="button btn-primary btn-stacked" data-test="delete-issue" onClick={this.deleteIssue}>Delete Issue</button>
        </div>
      );
    }
  }

  export default AddIssue;
