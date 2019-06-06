import React from 'react';
import ReactDOM from 'react-dom';
import AddIssues from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });
it('Issues component loads', () => {
   shallow(<AddIssues />);
});

describe('When adding an issue', () => {
    it('title is displayed correctly', () => {
      const wrapper = shallow(<AddIssues />);
      const AddIssuesHeader = wrapper.find('.AddIssuesHeader');
      expect(AddIssuesHeader.text()).toBe('Record Issues at Meeting'); 
    });

   })

