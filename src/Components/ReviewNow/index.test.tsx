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

describe('When we go to click "Review now with TRA"', ()  => {
    const wrapper = shallow(<ReviewNow isReviewingNow={false} />);; 
    let button = wrapper.find('#review-now');
    button.simulate('click');

    it('Then the save "Review now with TRA" button is NOT displayed', () => {
        //button should be hidden
        var hiddenButton = wrapper.find('#review-now');
        expect(hiddenButton.exists()).toBe(false); 
    });

    it('Then the save "Signature of TRA representative" text is displayed', () => {
        const element = wrapper.find('.signature-of-TRA-rep')
        expect(element.text()).toBe('Signature of TRA representative');
    });

    it('Then the save "Role of TRA representative" text is displayed', () => {
        const element = wrapper.find('.role-of-TRA-representative')
        expect(element.text()).toBe('Role of TRA representative');
    });

    it('Then the save "Chair" radio button is displayed', () => {
        const element = wrapper.find('#chair')
        expect(element.prop("value").toBe('Chair');
    });
});
