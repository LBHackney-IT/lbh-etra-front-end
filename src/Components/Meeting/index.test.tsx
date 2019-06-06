import React from 'react';
import ReactDOM from 'react-dom';
import Meeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import ReviewMeeting from '../ReviewMeeting';

configure({ adapter: new Adapter() });

it('Meeting component loads', () => {
   shallow(<Meeting />);
});

describe('When we go to render the meeting', () => {
    it('title is displayed with correct TRA Name and Date', () => {
        const traName = "Gotham City"
        const date = new Date("June 5, 2019")

        const wrapper = shallow(<Meeting traName={traName} dateOfMeeting={date}/>); 
        const header = wrapper.find("h1");

        expect(header.text()).toBe(`${traName} ETRA meeting 5/6/2019`); 
    });

    it("review meeting component is rendered", () => {
        const wrapper = shallow(<Meeting traName={"Test"}/>); 
        const reviewMeeting = wrapper.find(ReviewMeeting);

        expect(reviewMeeting).toHaveLength(1);
    })
});
