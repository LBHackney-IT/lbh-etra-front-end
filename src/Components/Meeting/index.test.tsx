import React from 'react';
import ReactDOM from 'react-dom';
import Meeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import ReviewMeeting from '../ReviewMeeting';

configure({ adapter: new Adapter() });

it('Meeting component loads', () => {
   shallow(<Meeting traName="Test Name"/>);
});

describe('When we go to render the meeting', () => {
    const traName = "Gotham City"
    const date = new Date("June 05, 2019")
    const wrapper = shallow(<Meeting traName={traName} dateOfMeeting={date}/>); 

    it('Then the back link is shown', () => {
        const lnkBack = wrapper.find('#lnkBack')
        expect(lnkBack.text()).toBe('Back'); 
     });

    it('title is displayed with correct TRA Name', () => {
        const header = wrapper.find("h1");
        expect(header.text()).toContain(`${traName} ETRA meeting`); 
    });

    it("review meeting component is rendered", () => {
        const reviewMeeting = wrapper.find(ReviewMeeting);
        expect(reviewMeeting).toHaveLength(1);
    })
});
