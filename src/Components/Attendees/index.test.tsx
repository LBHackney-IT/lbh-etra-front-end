import React from 'react';
import ReactDOM from 'react-dom';
import Attendees from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('Attendees component loads', () => {
   shallow(<Attendees />);
});

describe('When we go to render the Attendees form', () => {
    const wrapper = shallow(<Attendees/>); 

    it('Then the back link is shown', () => {
        const lnkBack = wrapper.find('#lnkBack')
        expect(lnkBack.text()).toBe('Back'); 
     });

     it('Then the attendees header is shown', () => {
        const AttendeeHeader = wrapper.find('.AttendeeHeader')
        expect(AttendeeHeader.text()).toBe('Meeting Attendees'); 
     });
});
