import { IssueFactory } from '.'

describe('When we go to create an issue', () => {
    let issueFactory = new IssueFactory();
    let issue = issueFactory.create();

    it('Then the issue is not null', () => {
        expect(issue).not.toBeNull();
    });

    it('Then the issue id is not null, nan oe undefined', () => {
        expect(issue.Id).not.toBeNull();
        expect(issue.Id).not.toBeUndefined();
        expect(issue.Id).not.toBeNaN();
    });
});
