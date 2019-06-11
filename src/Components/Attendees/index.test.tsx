import React from 'react';
import ReactDOM from 'react-dom';
import Attendees, { IAttendees } from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

it('Attendees component loads', () => {
   shallow(<Attendees onChangeAttendees={() => {}}/>);
});

describe('When we go to render the Attendees form', () => {
   const wrapper = shallow(<Attendees onChangeAttendees={() => {}}/>); 

   it('Then the attendees header is shown', () => {
      const attendeeHeader = wrapper.find('.meeting-attendance-header')
      expect(attendeeHeader.exists()).toBe(true); 
   });

   it("Then the Councillors label and input is shown", () => {
      const councillorLabel = wrapper.find('.councillor-label')
      expect(councillorLabel.exists()).toBe(true)

      const councillorInput = wrapper.find('.councillor-input')
      expect(councillorInput.exists()).toBe(true)
   });

   it("Then the Hackney Council Staff label and input is shown", () => {
      const hackneyStaffLabel = wrapper.find('.hackney-council-staff-label')
      expect(hackneyStaffLabel.exists()).toBe(true)
      
      const hackneyStaffInput = wrapper.find('.hackney-council-staff-input')
      expect(hackneyStaffInput.exists()).toBe(true)
   });

   it("Then the Number of attendees label and input is shown", () => {
      const attendeesNumberLabel = wrapper.find('.number-of-attendees-label')
      expect(attendeesNumberLabel.exists()).toBe(true)
      
      const attendeesNumberInput = wrapper.find('.number-of-attendees-input')
      expect(attendeesNumberInput.exists()).toBe(true)
   });
});
