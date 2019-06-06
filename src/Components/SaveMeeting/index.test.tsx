import React from 'react';
import ReactDOM from 'react-dom';
import SaveMeeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('Meeting component loads', () => {
   shallow(<SaveMeeting issues={[]} signature="" onSaveComplete={() => {}}/>);
});

describe('When we render the "Save Meeting component"', ()  => {
    const wrapper = shallow(<SaveMeeting issues={[]} signature="" onSaveComplete={() => {}}/>);; 

    it('Then the "Save and email issue list to TRA" button is displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.text()).toBe('Save and email issue list to TRA');
    });
});

describe('When we click the "Save and email issue list to TRA" button', ()  => {
    const onSaveComplete = jest.fn();
    const wrapper = shallow(<SaveMeeting issues={[]} signature="" onSaveComplete={onSaveComplete}/>);; 
    const element = wrapper.find('#save-meeting');
    element.simulate('click');

    it('Then the "Save and email issue list to TRA" button is NOT displayed', () => {
        const element = wrapper.find('#save-meeting')
        expect(element.exists()).toBe(false);
    });

    it('Then the spinner is displayed', () => {
        const element = wrapper.find('.spinner')
        expect(element.exists()).toBe(true);
    });

    it('Then onSaveComplete method is called', () => {
        expect(onSaveComplete).toHaveBeenCalled();
    });
});