import React from 'react'
import { IIssue } from '../../Domain/Issues';
import {AddIssue} from '../AddIssue/'
import {IssueFactory} from '../../Factories/Issue/'
import "./index.css"
import { IBlock } from '../../Domain/Area';
import { IBlockInfo } from '../../Boundary/BlockInfo';
import {v4 as uuid} from 'uuid';

interface IRecordIssueProps {
    blocks: IBlock[];
    issues: Array<IIssue>;
    onChangeIssues: (newIssues: Array<IIssue>) => void;
    readOnly: boolean;
}

interface IRecordIssueState {
    issues: Array<IIssue>
}

const divStyle = {
    position: 'relative' as 'relative',
    margin: '0 0 5px 0',
};

export default class RecordIssues extends React.Component<IRecordIssueProps, IRecordIssueState>{
    private _issueFactory:IssueFactory;
    private readonly blockInfo: IBlockInfo[] = [];

    constructor(props: IRecordIssueProps) {
        super(props);

        if(props.issues === null)
            props.issues = [];

        this.state = {
            issues: props.issues,
        };

        this._issueFactory = new IssueFactory();


        if(this.props.readOnly) { return; }
        this.blockInfo = this.props.blocks.map((block) => {
            return {id: uuid(), block: block};
        });
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
        this.props.onChangeIssues(issues)
    }

    onDeleteIssue = (index: number) : void => {
        let issues = this.state.issues;
        //remove issue from array at index
        issues.splice(index, 1);
        this.setState({issues:issues});
        this.props.onChangeIssues(issues)
    }

    renderNoIssuesText(){
        return (
            <div 
                className="no-issues-text"
                id="no-issues"
                data-test="no-issues">
                    No issues in meeting
            </div>
        );
    }

    renderAddIssuesButton(){
        return (
            <>
                <div style={ this.props.issues.length > 0 ? divStyle : {}}>
                    <button 
                        id="add-issue"
                        data-test="add-issue"
                        className="button btn-primary btn-stacked"
                        onClick={this.addIssueComponent}>
                            Add an issue
                    </button>
                </div>
                <div>
                <div className="heading">Saving and signing off the ETRA meeting</div>
                    <p>The ETRA meeting needs to synchronise with Manage a tenancy. You need to be online and signed into Manage a tenancy 
                        for this to happen. Do not close your web browser or switch off your iPad until you have done this.</p>
                    <p>If you are offline or not signed into Manage a tenancy you can only ‘Save the issues for review with the TRA later’. The TRA 
                        representative’s signature, name and role will not be saved at this stage. Once you are back online and signed in, you will be 
                        able to ‘Email issues to the TRA for sign off’. To do this you need sign in to Manage a tenancy and navigate to the ETRA meetings 
                        page and click on the link: ‘Draft ETRA meetings for review’. You should then see a link to the meeting on the next page..</p>
                    <p>If at the meeting you are online, sign into Manage a tenancy and then the TRA representative can sign, add 
                    their name and role and you can ‘Save the signed off issue list and email to TRA’.</p>
                </div>
            </>
        );
    }
    
    render() {
        return (
            <div>
                <div className="heading" data-test="issues-header">Record issues at meeting</div>
                {this.state.issues.length === 0 && this.renderNoIssuesText()}
                {this.state.issues.map((issue:IIssue, index: number) =>
                    <AddIssue blocks={this.blockInfo} key={issue.id} index={index} onChangeIssue={this.onChangeIssue} onDeleteIssue={this.onDeleteIssue} issue={issue} readOnly={this.props.readOnly}/>
                )}
                {!this.props.readOnly && this.renderAddIssuesButton()}
            </div>
            );
    }
}
