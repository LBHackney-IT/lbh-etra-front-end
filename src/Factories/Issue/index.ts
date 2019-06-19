import { IFactory } from "../index";
import { v4 as uuid } from 'uuid';
import { IssueType } from '../../Domain/IssueType';
import { IIssue, Issue } from '../../Domain/Issues';
import {IssueLocationFactory} from '../IssueLocation'

export class IssueFactory implements IFactory<IIssue>  {
    private readonly issueLocationFactory:IssueLocationFactory;
    public constructor(){
        this.issueLocationFactory = new IssueLocationFactory();
    }

    public create(): IIssue {
        let id = uuid();
        let issueType = new IssueType({IssueId:"", IssueType:""});
        let location = this.issueLocationFactory.create();
        let newIssue = new Issue(id, issueType, location,"" );
        return newIssue;
    }
}
