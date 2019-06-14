import { IFactory } from "../index";
import { v4 as uuid } from 'uuid';
import { IssueType } from '../../Domain/IssueType';
import { BlockLocation } from "../../Domain/BlockLocation";
import { IssueLocation } from "../../Domain/IssueLocation";
import { IIssue, Issue } from '../../Domain/Issues';

export class IssueFactory implements IFactory<IIssue>  {
    public create(): IIssue {
        let id = uuid();
        let issueType = new IssueType("", "");
        let location = new IssueLocation("", "",new BlockLocation("", ""));
        let newIssue = new Issue(id, issueType, location,"" );
        return newIssue;
    }
}
