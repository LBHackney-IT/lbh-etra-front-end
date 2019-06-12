import React, { Component } from 'react'
import { IIssueType, IssueType } from '../../Domain/IssueType';
import { IIssueLocation, IssueLocation } from '../../Domain/IssueLocation';
import { IIssue, Issue } from '../../Domain/Issues';
import {AddIssue} from '../AddIssue/'


interface IRecordIssueProps {
    issues: Array<IIssue>
}

interface IRecordIssueState {
    issues: Array<IIssue>
}

export default class RecordIssues extends React.Component<IRecordIssueProps, IRecordIssueState>{
    constructor(props: IRecordIssueProps) {
        super(props);
        this.state = {
            issues: props.issues
          };
    }
   
    addIssueComponent()
    {
        console.log("addIssueComponent called");
        let issueType = new IssueType("", "");
        let location = new IssueLocation("", "");
        let newIssue = new Issue(issueType, location,"" );
        const issues = this.state.issues;
        issues.push(newIssue);
        this.setState({issues:issues});
        console.log(this.state.issues.length);
    }

    onChangeIssue(issue:IIssue, index:number){
        this.state.issues[index] = issue;
    }

    render() {
        //const issues = 
        return (
            <div>
                {this.state.issues.map((issue:IIssue, index) =>
                    <AddIssue key={index} onChangeIssues={()=> this.onChangeIssue(issue,index)} issue={issue}/>
                )}
                <button id="add-issue" data-test="add-issue" className="button btn-primary btn-stacked"  onClick={this.addIssueComponent.bind(this)}>Add Issues</button>
            </div>
            );
    }
}




