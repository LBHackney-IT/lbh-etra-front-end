import React, { Component } from 'react'
import { IIssueType, IssueType } from '../../Domain/IssueType';
import { IIssueLocation, IssueLocation } from '../../Domain/IssueLocation';
import { IIssue, Issue } from '../../Domain/Issues';
import {AddIssue} from '../AddIssue/'
import { v4 as uuid } from 'uuid';



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
        let id = uuid();
        let issueType = new IssueType("", "");
        let location = new IssueLocation("", "");
        let newIssue = new Issue(id, issueType, location,"" );
        const issues = this.state.issues;
        issues.push(newIssue);
        this.setState({issues:issues});
        console.log(this.state.issues.length);
    }

    onChangeIssue(issue:IIssue, index:number){
        let issues = this.state.issues;
        issues[index] = issue;
        this.setState({issues:issues});
    }

    onDeleteIssue(index:number){
        let issues = this.state.issues;
        console.log("issues before splice");
        console.log(issues);
        //remove issue from array at index
        debugger;
        issues.splice(index, 1);
        this.setState({issues:issues});
        console.log("issues after splice");
        console.log(issues);

    }

    render() {
        //const issues = 
        return (
            <div>
                {this.state.issues.map((issue:IIssue, index) =>
                    <AddIssue key={issue.Id} index={index} onDeleteIssue={this.onDeleteIssue.bind(this)} onChangeIssues={()=> this.onChangeIssue(issue,index)} issue={issue}/>
                )}
                <button id="add-issue" data-test="add-issue" className="button btn-primary btn-stacked"  onClick={this.addIssueComponent.bind(this)}>Add Issues</button>
            </div>
            );
    }
}