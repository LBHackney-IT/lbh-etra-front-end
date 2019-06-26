import React from 'react';
import RepName from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('RepName component loads', () => {
   shallow(<RepName onUpdated={(repName: string) => {console.log(`{Representative Name ${repName}}`)}}/>);
});

describe('When we go to render the meeting component', () => {
   const wrapper = shallow(<RepName onUpdated={(repName:string) => {console.log`{Representative Name ${repName}}`}}/>)
   it('Then it can display the title', () => {
      const element = wrapper.find(".confirmation-title")
      expect(element.exists()).toBe(true)
   });
   it('Then it can display the textbox', () => {
      const element = wrapper.find(".representative-name")
      expect(element.exists()).toBe(true)
   });
});