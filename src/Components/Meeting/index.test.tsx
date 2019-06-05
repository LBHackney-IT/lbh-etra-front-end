import React from 'react';
import ReactDOM from 'react-dom';
import Meeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

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

    it('Then the save "Review now with TRA" button is displayed', () => {
        const wrapper = shallow(<Meeting />); 
        const button = wrapper.find('#review-now')
        expect(button.text()).toBe('Review now with TRA'); 
    });

    it('Then the save "TRA representative to review later" button is displayed', () => {
        const wrapper = shallow(<Meeting />);; 
        const button = wrapper.find('#review-later')
        expect(button.text()).toBe('TRA representative to review later');  
    });

    it('Then the save Ready for review by TRA representative?" header is displayed', () => {
        const wrapper = shallow(<Meeting />);; 
        const element = wrapper.find('.ready-for-review-by')
        expect(element.text()).toBe('Ready for review by TRA representative?');
    });
});
