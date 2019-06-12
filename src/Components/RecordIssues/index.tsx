import React, { Component } from 'react'
import { IIssueType } from '../IssueType';
import { ILocation } from '../Location';
import { IIssue } from '../Issues';
import {AddIssue} from '../AddIssue/index'
import { ReactComponent } from '*.svg';
import { array } from 'prop-types';


interface IRecordIssueProps {
    issues: Array<IIssue>

}

interface IRecordIssueState {
    counter:number
}

export default class RecordIssues extends React.Component<IRecordIssueProps, IRecordIssueState>{
    constructor(props: IRecordIssueProps) {
        super(props)
        this.state={counter:1}
    }
   
    addIssueComponent=()=>
    {
        this.setState({counter: this.state.counter+1})
    }

    render() {
        return (
            
        <button className="button btn-primary btn-stacked" id="add-issue" onClick={this.addIssueComponent}>Add Issues</button>);
    }
}




