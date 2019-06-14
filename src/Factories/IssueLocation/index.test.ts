import { IssueLocationFactory } from '.'
import { IssueType } from '../../Domain/IssueType';
import {IssueLocationType} from '../../Domain/IssueLocation'

describe('When we go to create an issue location', () => {
    let issueFactory = new IssueLocationFactory();
    let location = issueFactory.create();

    it('Then the issue location is not null', () => {
        expect(location).not.toBeNull();
    });

    it('Then the issue location key is not null, nan oe undefined', () => {
        expect(location.key).not.toBeNull();
        expect(location.key).not.toBeUndefined();
        expect(location.key).not.toBeNaN();
    });
});

describe('When we go to create an issue location with Estate Type', () => {
    let issueFactory = new IssueLocationFactory();
    let issue = issueFactory.createFromLocationType(IssueLocationType.Estate);

    it('Then the issue location is not null', () => {
        expect(issue).not.toBeNull();
    });

    it('Then the issue location key is not null, nan oe undefined', () => {
        expect(issue.key).not.toBeNull();
        expect(issue.key).not.toBeUndefined();
        expect(issue.key).not.toBeNaN();
    });

    it('Then the issue location type is Estate', () => {
        expect(issue.locationType).toBe(IssueLocationType.Estate);
    });
});

describe('When we go to create an issue location with Block Type', () => {
    let issueFactory = new IssueLocationFactory();
    let issue = issueFactory.createFromLocationType(IssueLocationType.Block);

    it('Then the issue location type is Block', () => {
        expect(issue.locationType).toBe(IssueLocationType.Block);
    });
});

describe('When we go to create an issue location with Other Type', () => {
    let issueFactory = new IssueLocationFactory();
    let issue = issueFactory.createFromLocationType(IssueLocationType.Other);

    it('Then the issue location type is Other', () => {
        expect(issue.locationType).toBe(IssueLocationType.Other);
    });
});

describe('When we go to create an issue location from an estate location', () => {
    let issueFactory = new IssueLocationFactory();
    let issue = issueFactory.createFromEstateLocation();

    it('Then the issue location type is Other', () => {
        expect(issue.locationType).toBe(IssueLocationType.Estate);
    });
});