import React, { ChangeEvent } from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';
import issueTypesData from "../../JsonFiles/IssueType.json"
import { IssueType, IIssueType } from "../../Domain/IssueType"
import { IIssueLocation } from "../../Domain/IssueLocation";
import { IIssueLocationGateway as ILoadIssueLocationGateway } from '../../Boundary/IssueLocation/'
import { IServiceProvider, ServiceContext } from '../../ServiceContext';

export interface IAddIssuesProps {
  onChangeIssue: (issues: IIssue, index: number) => void;
  onDeleteIssue: (index: number) => void;
  issue: IIssue;
  index: number;
  readOnly: boolean
}

export interface IAddIssueState {
  issue: IIssue;
  issueTypes: IIssueType[];
  issueLocations: IIssueLocation[];
}

export class AddIssue extends React.Component<IAddIssuesProps, IAddIssueState> {
  public static contextType = ServiceContext;

  private _issueTypes = Array.from<IssueType>(issueTypesData);
  private _issueLocations = new Array<IIssueLocation>();
  private _issueLoadLocationGateway: ILoadIssueLocationGateway;

  public constructor(props: IAddIssuesProps, context: IServiceProvider) {
    super(props);
    this._issueLoadLocationGateway = context.get<ILoadIssueLocationGateway>("ILoadIssueLocationGateway");
    this.loadIssueLocations();

    this.state = {
      issue: this.props.issue,
      issueTypes: this._issueTypes,
      issueLocations: this._issueLocations,
    };
  }

  loadIssueLocations() {
    this._issueLoadLocationGateway.loadIssueLocations().then((data) => {
      this._issueLocations = data.issueLocations;
      this.setState({ issueLocations: data.issueLocations });
    });
  }

  deleteIssue = (): void => {
    this.props.onDeleteIssue(this.props.index);
  }

  handleChangeOfIssueNote = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = event.target.value;

    let issue = this.state.issue;
    issue.Notes = value;
    this.setState({ issue: issue });

    this.props.onChangeIssue(issue, this.props.index);
  }

  handleChangeOfIssueTypeDropDownList = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const issueId = event.target.value;
    let issueType = this.state.issueTypes.find((issueType) => issueId === issueType.IssueId);

    if(issueType === undefined){ return; }

    let issue = this.state.issue;
    issue.IssueType = issueType;
    this.setState({ issue: issue });

    this.props.onChangeIssue(issue, this.props.index);
  }

  handleChangeOfIssueLocationDropDownList = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const locationKey = event.target.value;
    let location = this.state.issueLocations.find((location) => locationKey === location.key);

    if(location === undefined){ return; }

    let issue = this.state.issue;
    issue.Location = location;
    this.setState({ issue: issue });

    this.props.onChangeIssue(issue, this.props.index);
  }

  renderIssueType(issueType: IIssueType, index: number) {
    return (
      <option key={index} value={issueType.IssueId}>{issueType.IssueType}</option>
    );
  }

  renderLocation(location: IIssueLocation) {
    return (
      <option key={location.key} value={location.key}>{location.name}</option>
    );
  }

  renderFirstOption(text: string) {
    return (<option value="" disabled>{text}</option>)
  }

  conditionalRender(readOnly: any, notReadOnly: any) {
    return (<>{this.props.readOnly ? readOnly : notReadOnly}</>);
  }

  renderReadOnly(text: string, id: string) {
    return (
      <div id={id} data-test={id} className="issue-display-box">{text}</div>
    );
  }

  renderNotReadOnlyIssueType() {
    return (
      <select id="issue-dropdown" data-test="issue-dropdown" className="select" onChange={this.handleChangeOfIssueTypeDropDownList} name="IssueType" value={this.state.issue.IssueType.IssueId}>
        {this.renderFirstOption("Select Issue Type")}
        {this._issueTypes.map(this.renderIssueType)}
      </select>
    );
  }

  renderNotReadOnlyLocation() {
    console.log(this.state.issue.Location.key);
    return (
      <select id="location-dropdown" data-test="location-dropdown" className="select" onChange={this.handleChangeOfIssueLocationDropDownList} name="IssueLocation" value={this.state.issue.Location.key}>
        {this.renderFirstOption("Select Location")}
        {this._issueLocations.map(this.renderLocation)}
      </select>
    );
  }

  renderNotReadOnlyNotes() {
    return (<textarea className="note-input-box" data-test="notes" id="issue-note" value={this.state.issue.Notes} onChange={this.handleChangeOfIssueNote} name="notes" />);
  }

  renderDeleteIssueButton() {
    return (
      <div className="button-wrapper">
        <button
        id="delete-issue"
        className="button btn-secondary"
        data-test="delete-issue"
        onClick={this.deleteIssue}>
        Cancel
      </button>
      </div>
    );
  }

  render() {
    return (
      <div className={`wrapper ${this.props.readOnly ? "read-only-background" : ""}`}>
        <div className="issue">
          <label data-test="issue-label" className="label">Issue type</label>
          <br />
          {this.conditionalRender(this.renderReadOnly(this.state.issue.IssueType.IssueType, "issue-type-text"), this.renderNotReadOnlyIssueType())}
        </div>

        <div className="issue">
          <label data-test="location-label" className="label">Location of issue</label>
          <br />
          {this.conditionalRender(this.renderReadOnly(this.state.issue.Location.name, "location-text"), this.renderNotReadOnlyLocation())}
        </div>

        <div className="issue">
          <label data-text="notes-label" className="label">Notes about issue</label>
          <br />
          {this.conditionalRender(this.renderReadOnly(this.state.issue.Notes, "notes-text"), this.renderNotReadOnlyNotes())}
        </div>

        {!this.props.readOnly && this.renderDeleteIssueButton()}
      </div>
    );
  }
}

export default AddIssue;
