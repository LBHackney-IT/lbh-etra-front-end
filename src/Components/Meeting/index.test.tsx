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
    it('Then the save "Review now with TRA" button is displayed', () => {
        const wrapper = shallow(<Meeting />);; 
        const button = wrapper.find('#review-now')
        expect(button.text()).toBe('Review now with TRA'); 
    });

    it('Then the save "TRA representative to review later" button is displayed', () => {
        const wrapper = shallow(<Meeting />);; 
        const button = wrapper.find('#review-later')
        expect(button.text()).toBe('TRA representative to review later');  
    });

    it('Then the save "TRA representative to review later" button is displayed', () => {
        const wrapper = shallow(<Meeting />);; 
        const element = wrapper.find('.ready-for-review-by')
        expect(element.text()).toBe('Ready for review by TRA representative?');
    });
});

describe('When we go to click "Review now with TRA""', () => {
    it('Then the save "Review now with TRA" button is NOT displayed', () => {
        
        const wrapper = shallow(<Meeting />);; 
        let button = wrapper.find('#review-now')
        button.simulate('click');
        //button should be hidden
        button = wrapper.find('#review-now')
        expect(button.isEmpty()).toBe(true);
          
    });
});
