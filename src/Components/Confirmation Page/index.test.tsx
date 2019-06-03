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

        
        it('Then the confirmation page is shown', () => {
            
        


         });
      });
  });

  function GivenThatWeStartANewMeeting(){

  }
