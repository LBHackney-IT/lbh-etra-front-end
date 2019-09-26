import React, { ChangeEvent } from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';
import issueTypesData from "../../JsonFiles/IssueType.json"
import { IssueType, IIssueType } from "../../Domain/IssueType"
import { IServiceProvider, ServiceContext } from '../../ServiceContext';
import { IBlockInfo } from '../../Boundary/BlockInfo';

export interface IAddIssuesProps {
  onChangeIssue: (issues: IIssue, index: number) => void;
  onDeleteIssue: (index: number) => void;
  blocks: IBlockInfo[];
  issue: IIssue;
  index: number;
  readOnly: boolean
}

export interface IAddIssueState {
  selectedBlockId: string;
  issue: IIssue;
  issueTypes: IIssueType[];
}

export class AddIssue extends React.Component<IAddIssuesProps, IAddIssueState> {
  public static contextType = ServiceContext;

  private _issueTypes = Array.from<IssueType>(issueTypesData);

  public constructor(props: IAddIssuesProps, context: IServiceProvider) {
    super(props);

    this.state = {
      selectedBlockId: "",
      issue: this.props.issue,
      issueTypes: this._issueTypes,
    };
  }

  deleteIssue = (): void => {
    this.props.onDeleteIssue(this.props.index);
  }

  handleChangeOfIssueNote = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = event.target.value;

    let issue = this.state.issue;
    issue.notes = value;
    this.setState({ issue: issue });

    this.props.onChangeIssue(issue, this.props.index);
  }

  handleChangeOfIssueTypeDropDownList = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const issueId = event.target.value;
    let issueType = this.state.issueTypes.find((issueType) => issueId === issueType.issueId);

    if(issueType === undefined){ return; }

    let issue = this.state.issue;
    issue.issueType = issueType;
    this.setState({ issue: issue });

    this.props.onChangeIssue(issue, this.props.index);
  }

  handleChangeOfIssueLocationDropDownList = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const blockKey = event.target.value;
    let blockInfo = this.props.blocks.find((block) => blockKey === block.id);

    if(blockInfo === undefined){ return; }

    let issue = this.state.issue;
    issue.location = blockInfo.block;
    this.setState({ issue: issue, selectedBlockId: blockKey });

    this.props.onChangeIssue(issue, this.props.index);
  }

  lookupIssueType(issueId: string){
    const issue = this._issueTypes.find(el => el.issueId === issueId);
    if(issue){
      return issue.issueType;
    }else{
      return issueId;
    }
  }

  renderIssueType(issueType: IIssueType, index: number) {
    return (
      <option key={index} value={issueType.issueId}>{issueType.issueType}</option>
    );
  }

  renderLocation(location: IBlockInfo) {
    return (
      <option data-test="location-option" key={location.id} value={location.id}>{location.block.name}</option>
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
      <select id="issue-dropdown" data-test="issue-dropdown" className="select" onChange={this.handleChangeOfIssueTypeDropDownList} name="issueType" value={this.state.issue.issueType.issueId}>
        {this.renderFirstOption("Select Issue Type")}
        {this._issueTypes.map(this.renderIssueType)}
      </select>
    );
  }

  renderNotReadOnlyLocation() {
    return (
      <select id="location-dropdown" data-test="location-dropdown" className="select" onChange={this.handleChangeOfIssueLocationDropDownList} name="IssueLocation" value={this.state.selectedBlockId}>
        {this.renderFirstOption("Select Location")}
        {this.props.blocks.map(this.renderLocation)}
      </select>
    );
  }

  renderNotReadOnlyNotes() {
    return (<textarea className="note-input-box" data-test="notes" id="issue-note" value={this.state.issue.notes} onChange={this.handleChangeOfIssueNote} name="notes" />);
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
          {this.conditionalRender(this.renderReadOnly(this.lookupIssueType(this.state.issue.issueType.issueId), "issue-type-text"), this.renderNotReadOnlyIssueType())}
        </div>

        <div className="issue">
          <label data-test="location-label" className="label">Location of issue</label>
          <br />
          {this.conditionalRender(this.renderReadOnly(this.state.issue.location.name, "location-text"), this.renderNotReadOnlyLocation())}
        </div>

        <div className="issue">
          <label data-text="notes-label" className="label">Notes about issue</label>
          <br />
          {this.state.issue.notes.split("\n").map((i,key) => {
            return <div key={key}>{this.conditionalRender(this.renderReadOnly(i, "notes-text"), this.renderNotReadOnlyNotes())}</div>;
        })}
        </div>

        {!this.props.readOnly && this.renderDeleteIssueButton()}
      </div>
    );
  }
}

export default AddIssue;
