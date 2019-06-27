import { IFactory } from "../index";
import { v4 as uuid } from 'uuid';
import { IssueType } from '../../Domain/IssueType';
import { IIssue, Issue } from '../../Domain/Issues';

export class IssueFactory implements IFactory<IIssue>  {
    public create(): IIssue {
        let id = uuid();
        let issueType = new IssueType("","");
        let location = {name: ""};
        let newIssue = new Issue(id, issueType, location,"" );
        return newIssue;
    }
}
