import React from 'react';
import ReactDOM from 'react-dom';
import Meeting from './';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('Meeting component loads', () => {
   shallow(<Meeting />);
});

describe('Given that start a new meeting', () => {
    describe('When we go to save the meeting', () => {
        it('Then the save meeting use case is called', () => {
            shallow(<Meeting />);
         });
      });
  });