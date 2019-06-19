import React from 'react'
import { IIssue } from '../../Domain/Issues';
import {AddIssue} from '../AddIssue/'
import {IssueFactory} from '../../Factories/Issue/'
import "./index.css"

interface IRecordIssueProps {
    issues: Array<IIssue>
    onChangeIssues: (newIssues: Array<IIssue>) => void;
}

interface IRecordIssueState {
    issues: Array<IIssue>
}

export default class RecordIssues extends React.Component<IRecordIssueProps, IRecordIssueState>{
    private _issueFactory:IssueFactory;
    constructor(props: IRecordIssueProps) {
        super(props);

        this.state = {
            issues: props.issues,
          };
        this._issueFactory = new IssueFactory();
    }
   
    addIssueComponent = () : void => {
        let newIssue = this._issueFactory.create();
        const issues = this.state.issues;
        issues.push(newIssue);
        this.setState({issues:issues});
    }

    onChangeIssue = (issue: IIssue, index: number) : void => {
        let issues = this.state.issues;
        issues[index] = issue;
        this.setState({issues:issues});
        this.props.onChangeIssues(this.state.issues)
    }

    onDeleteIssue = (index: number) : void => {
        let issues = this.state.issues;
        //remove issue from array at index
        issues.splice(index, 1);
        this.setState({issues:issues});
        this.props.onChangeIssues(this.state.issues)
    }


    render() {
        return (
            <div>
                <div className="heading" data-test="issues-header">Record issues at meeting</div>
                {this.state.issues.map((issue:IIssue, index: number) =>
                    <AddIssue key={issue.Id} index={index} onChangeIssue={this.onChangeIssue} onDeleteIssue={this.onDeleteIssue} issue={issue}/>
                )}
                <button id="add-issue" data-test="add-issue" className="button btn-primary btn-stacked button-padding"  onClick={this.addIssueComponent}>Add another issue</button>
            </div>
            );
    }
}
