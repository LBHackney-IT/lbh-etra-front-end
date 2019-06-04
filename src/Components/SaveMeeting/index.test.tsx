import React from 'react';
import ReactDOM from 'react-dom';
import SaveMeeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('Meeting component loads', () => {
   shallow(<SaveMeeting />);
});

describe('When we render the "Save Meeting component"', ()  => {
    const wrapper = shallow(<SaveMeeting isAttemptingToSave={false} />);; 

    it('Then the "Save and email issue list to TRA" button is displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.text()).toBe('Save and email issue list to TRA');
    });
});

describe('When we click the "Save and email issue list to TRA" button', ()  => {
    const wrapper = shallow(<SaveMeeting isAttemptingToSave={false} />);; 
    const element = wrapper.find('#save-meeting');
    element.simulate('click');

    it('Then the "Save and email issue list to TRA" button is NOT displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.exists()).toBe(false);
    });
});
