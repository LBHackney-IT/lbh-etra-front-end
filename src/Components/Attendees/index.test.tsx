import React from 'react';
import ReactDOM from 'react-dom';
import Attendees from '.';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import { IAttendees } from '../../Domain/Attendees';

configure({ adapter: new Adapter() });

const defaultAttendees : IAttendees = {
   councillors: "",
   hackneyStaff: "",
   attendees: 0
}

it('Attendees component loads', () => {
   shallow(<Attendees attendees={defaultAttendees} onChangeAttendees={() => {}} readOnly={false}/>);
});

describe('When we go to render the Attendees form with readonly false', () => {
   const wrapper = shallow(<Attendees attendees={defaultAttendees} onChangeAttendees={() => {}} readOnly={false}/>); 

   it('Then the attendees header is shown', () => {
      const attendeeHeader = wrapper.find('[data-test="meeting-attendance-header"]')
      expect(attendeeHeader.exists()).toBe(true); 
   });

   it("Then the Councillors label and input is shown", () => {
      const councillorLabel = wrapper.find('[data-test="councillor-label"]')
      expect(councillorLabel.exists()).toBe(true)

      const councillorInput = wrapper.find('[data-test="councillor-input"]')
      expect(councillorInput.exists()).toBe(true)
   });

   it("Then the Hackney Council Staff label and input is shown", () => {
      const hackneyStaffLabel = wrapper.find('[data-test="hackney-council-staff-label"]')
      expect(hackneyStaffLabel.exists()).toBe(true)
      
      const hackneyStaffInput = wrapper.find('[data-test="hackney-council-staff-input"]')
      expect(hackneyStaffInput.exists()).toBe(true)
   });

   it("Then the Number of attendees label and input is shown", () => {
      const attendeesNumberLabel = wrapper.find('[data-test="number-of-attendees-label"]')
      expect(attendeesNumberLabel.exists()).toBe(true)
      
      const attendeesNumberInput = wrapper.find('[data-test="number-of-attendees-input"]')
      expect(attendeesNumberInput.exists()).toBe(true)
   });
});

describe('When we go to render the Attendees component with readonly true', () => {
   const wrapper = shallow(<Attendees attendees={defaultAttendees} onChangeAttendees={() => {}} readOnly={true}/>); 

   it('Then the attendees header is shown', () => {
      const attendeeHeader = wrapper.find('[data-test="meeting-attendance-header"]')
      expect(attendeeHeader.exists()).toBe(true); 
   });

   it("Then the Councillors label and text is shown", () => {
      const councillorLabel = wrapper.find('[data-test="councillor-label"]')
      expect(councillorLabel.exists()).toBe(true)

      const councillorText = wrapper.find('[data-test="councillors-text"]')
      expect(councillorText.exists()).toBe(true)
   });

   it("Then the Hackney Council Staff label and text is shown", () => {
      const hackneyStaffLabel = wrapper.find('[data-test="hackney-council-staff-label"]')
      expect(hackneyStaffLabel.exists()).toBe(true)
      
      const hackneyStaffText = wrapper.find('[data-test="staff-text"]')
      expect(hackneyStaffText.exists()).toBe(true)
   });

   it("Then the Number of attendees label and text is shown", () => {
      const attendeesNumberLabel = wrapper.find('[data-test="number-of-attendees-label"]')
      expect(attendeesNumberLabel.exists()).toBe(true)
      
      const attendeesNumberText = wrapper.find('[data-test="number-of-attendees-text"]')
      expect(attendeesNumberText.exists()).toBe(true)
   });
});
