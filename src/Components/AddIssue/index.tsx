import React, { ChangeEvent } from 'react';
import { IIssue, Issue } from '../../Domain/Issues';
import './index.css';
import issueTypesData from "../../JsonFiles/IssueType.json"
import {IIssueType, IssueTypeAndKey, IssueType} from "../../Domain/IssueType"
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
    }

    handleChangeOfIssueTypeDropDownList=(event:React.ChangeEvent<HTMLSelectElement>): void => {
      const index = Number(event.target.value);
      let issueType = this.state.issueTypes[index];
      let issue = this.state.issue;
      issue.IssueType.IssueType = issueType;
      this.setState({issue:issue});

      this.props.onChangeIssue(this.state.issue, this.props.index);
    }

    handleChangeOfIssueLocationDropDownList=(event:React.ChangeEvent<HTMLSelectElement>): void => {
      console.log("handleChangeOfIssueLocationDropDownList");
      
      const index = Number(event.target.value);
      let location = this.state.issueLocations[index];

      let issue = this.state.issue;
      issue.Location = location;
      this.setState({issue:issue });

      this.props.onChangeIssue(this.state.issue, this.props.index);
    }

    renderIssueType(issueType: IIssueType, index: number) {
      return (
        <option key={index} value={index}>{issueType.IssueType}</option>
      );
    }

    renderLocation(location: IIssueLocation, index:number)
    {
      return(
        <option key={location.key} value={index}>{location.name}</option>
      );
    }

    renderFirstOption(text: string){
      return (<option value="" disabled hidden>{text}</option>)
    }


    render() {
      return (
        <div>
          <div className="heading" data-test="issues-header">Record issues at the meeting</div>
          <div>
            <label data-test="issue-label">Issue Type</label><span/>
            <select data-test="issue-dropdown" onChange={this.handleChangeOfIssueTypeDropDownList} name="IssueType" value={this.state.issue.IssueType.IssueType.IssueType}>
              {this.renderFirstOption("Select Issue Type")}
              {this._issueTypes.map(this.renderIssueType)}
            </select>
          </div>
          <div>
          <label data-test="location-label">Issue Location</label>
            <select data-test="location-dropdown" onChange={this.handleChangeOfIssueLocationDropDownList} name="IssueLocation">
              {this.renderFirstOption("Select Location")}
              {this._issueLocations.map(this.renderLocation)}
            </select>
          </div>
          <div>
          <div><p>Issue Notes</p></div>
          <textarea className="note" data-test="notes" id="issue-note" value={this.state.issue.Notes} onChange={this.handleChangeOfIssueNote } name= "notes"/>
          </div>
          <button id="delete-issue" className="button btn-primary btn-stacked" data-test="delete-issue" onClick={this.deleteIssue}>Delete Issue</button>
        </div>
      );
    }
  }

  export default AddIssue;
