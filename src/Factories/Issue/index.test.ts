import { IssueFactory } from '.'

describe('When we go to create an issue', () => {
    let issueFactory = new IssueFactory();
    let issue = issueFactory.create();

    it('Then the issue is not null', () => {
        expect(issue).not.toBeNull();
    });

    it('Then the issue id is not null, nan oe undefined', () => {
        expect(issue.id).not.toBeNull();
        expect(issue.id).not.toBeUndefined();
        expect(issue.id).not.toBeNaN();
    });
});
