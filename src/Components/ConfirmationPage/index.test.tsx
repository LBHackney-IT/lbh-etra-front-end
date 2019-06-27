import React from 'react';
import ReactDOM from 'react-dom';
import Confirmation from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import { SignOff } from '../../Domain/SignOff';

configure({ adapter: new Adapter() });

it('Confirmation component loads', () => {
   shallow(<Confirmation signOff={new SignOff("", "", "")} />);
});

describe('Given that start a new meeting', () => {
   const repRole="TRA Chair";
   const repName="Representative Name"
    describe('When we go to save the meeting', () => {


        const wrapper = shallow(<Confirmation signOff={new SignOff("", repName, repRole)}/>);

         it('Then the "Signature of TRA representative" header is shown', () => {
            const divSignatureHeader=wrapper.find('.signature-header')
            expect(divSignatureHeader.text()).toBe('Signature of TRA representative'); 
         });

         it('Then the image control is displayed', () => {
            expect(wrapper.find("img").prop("alt")).toEqual("signature"); 
         });
        
         it('Then the image control is displayed', () => {
            expect(wrapper.find("img").prop("alt")).toEqual("signature"); 
         });
         
         it('Then the "TRA Role" is displayed', () => {
            const repRole=wrapper.find('.tra-role')
            expect(repRole.text()).toBe("TRA Chair"); 
         });
         it('Then the "TRA Role" is displayed', () => {
            const repNameElement=wrapper.find('.name-confirmation')
            expect(repNameElement.text()).toBe("I Representative Name do hereby confirm that I have reviewed these issues."); 
         });

      });
  });
