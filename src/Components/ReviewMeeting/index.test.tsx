import React from 'react';
import ReactDOM from 'react-dom';
import ReviewMeeting from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Signature from '../Signature';
import SaveMeeting from '../SaveMeeting';

configure({ adapter: new Adapter() });

it('Meeting component loads', () => {
   shallow(<ReviewMeeting />);
});

describe('When we go to click "Review now with TRA"', ()  => {
    const wrapper = shallow(<ReviewMeeting />);
    let button = wrapper.find('#review-now');
    button.simulate('click');

    it('Then the save "Review now with TRA" button is NOT displayed', () => {
        //button should be hidden
        var hiddenButton = wrapper.find('#review-now');
        expect(hiddenButton.exists()).toBe(false); 
    });

    it('Then the "TRA representative to review later" button is NOT displayed', () => {
        //button should be hidden
        var hiddenButton = wrapper.find('#review-later');
        expect(hiddenButton.exists()).toBe(false); 
    })

    it('Then the save "Signature of TRA representative" text and component is displayed', () => {
        const element = wrapper.find('.signature-of-TRA-rep')
        expect(element.text()).toBe('Signature of TRA representative');

        const signatureComponent = wrapper.find(Signature);
        expect(signatureComponent).toHaveLength(1);
    });

    it('Then the save "Role of TRA representative" text is displayed', () => {
        const element = wrapper.find('.role-of-TRA-representative')
        expect(element.text()).toBe('Role of TRA representative');
    });

    it('Then the Chair radio button is displayed', () => {
        const element = wrapper.find('#chair')
        expect(element.prop('name')).toBe('tra-role');
    });

    it('Then the Vice Chair radio button is displayed', () => {
        const element = wrapper.find('#vice-chair')
        expect(element.prop('name')).toBe('tra-role');
    });

    it('Then the Secretary radio button is displayed', () => {
        const element = wrapper.find('#secretary')
        expect(element.prop('name')).toBe('tra-role');
    });

    it('Then the Treasurer radio button is displayed', () => {
        const element = wrapper.find('#treasurer')
        expect(element.prop('name')).toBe('tra-role');
    });

    it('Then the SaveMeeting component is displayed', () => {
        const element = wrapper.find(SaveMeeting)
        expect(element).toHaveLength(1);
    });

    describe('And we go to select a "TRA role from the options"', ()  => {
        it('Then the Save and email issue list to TRA button is displayed', () => {

            const radio = wrapper.find('#secretary')
            radio.simulate('click');
        });

    });
});
