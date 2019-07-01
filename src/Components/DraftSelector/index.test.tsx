import React from 'react';
import ReactDOM from 'react-dom';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import DraftSelector from '.';
import { IMeetingModel, MeetingModel } from '../../Domain/Meeting';
import faker from 'faker';

configure({ adapter: new Adapter() });

function mockMeeting() : IMeetingModel {
    return new MeetingModel(
        faker.random.number(),
        faker.random.word(),
        [],
        {NumberOfAttendees: 2, HackneyStaff: "", Councillors: ""},
        {signature: "", name: "", role: ""});
}

it('Draft selector component loads', () => {
    shallow(<DraftSelector meeting={mockMeeting()} />);
});

describe('When we go to render the draft selector', () => {
    const meeting : IMeetingModel = mockMeeting();
    const wrapper = shallow(<DraftSelector meeting={meeting}/>);

    it('Then the name of the meeting is displayed', () => {
        const element = wrapper.find("[data-test='meeting-name']");
        expect(element).toHaveLength(1);
    });
});