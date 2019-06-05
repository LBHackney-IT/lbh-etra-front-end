import React from 'react';
import ReactDOM from 'react-dom';
import Confirmation from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('Confirmation component loads', () => {
   shallow(<Confirmation />);
});

describe('Given that start a new meeting', () => {
    describe('When we go to save the meeting', () => {
        const wrapper = shallow(<Confirmation />);

        it('Then the confirmation page is shown', () => {
            const wrapper = shallow(<Confirmation />);
         });

         it('Then the back link is shown', () => {
            const wrapper = shallow(<Confirmation />);
            const lnkBack=wrapper.find('#lnkBack')
            expect(lnkBack.text()).toBe('Back'); 
         });

         it('Then the "Issues confirmed" header is shown', () => {
            const wrapper = shallow(<Confirmation />);
            const divIssueConfirm=wrapper.find('.issue-confirmed')
            expect(divIssueConfirm.text()).toBe('Issues confirmed'); 
         });

         it('Then the "Signature of TRA representative" header is shown', () => {
            const wrapper = shallow(<Confirmation />);
            const divSignatureHeader=wrapper.find('.signature-header')
            expect(divSignatureHeader.text()).toBe('Signature of TRA representative'); 
         });

         it('Then the image control is displayed', () => {
            const wrapper = shallow(<Confirmation />);
            expect(wrapper.find("img").prop("alt")).toEqual("signature"); 
         });

        
         it('Then the image control is displayed', () => {
            const wrapper = shallow(<Confirmation />);
            expect(wrapper.find("img").prop("alt")).toEqual("signature"); 
         });
      });
  });
