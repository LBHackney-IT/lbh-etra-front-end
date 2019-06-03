import React from 'react';
import ReactDOM from 'react-dom';
import ReviewNow from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('Meeting component loads', () => {
   shallow(<ReviewNow />);
});

describe('When we go to click "Review now with TRA""', () => {
    it('Then the save "Review now with TRA" button is NOT displayed', () => {
        
        const wrapper = shallow(<ReviewNow />);; 
        let button = wrapper.find('#review-now')
        button.simulate('click');
        //button should be hidden
        button = wrapper.find('#review-now')
        expect(button.isEmpty()).toBe(true);
          
    });
});
