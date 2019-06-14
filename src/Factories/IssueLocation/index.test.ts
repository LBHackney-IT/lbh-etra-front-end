import { IssueLocationFactory } from '.'
import { IssueType } from '../../Domain/IssueType';
import {IssueLocationType} from '../../Domain/IssueLocation'
import { IEstateLocation } from '../../Domain/EstateLocation';

import locationsData from "../../JsonFiles/IssueLocation.json";

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

    let estateLocations = Array.from<IEstateLocation>(locationsData);

    let locations = issueFactory.createFromEstateLocation(estateLocations[0]);

    it('Then the issue location type is Estate for the first location', () => {
        let estate = locations[0];
        expect(estate.locationType).toBe(IssueLocationType.Estate);
        expect(estate.name).toBe("De Beauvoir Road  De Beauvoir Estate");
    });

    it('Then the issue location type is Block for the second location', () => {
        let block = locations[1];
        expect(block.locationType).toBe(IssueLocationType.Block);
        expect(block.name).toBe("De Beauvoir Estate  1-126 Fermain Court");
    });
});