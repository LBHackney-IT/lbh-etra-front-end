import React from 'react';
import { storiesOf } from '@storybook/react';
import Attendees from './index';

const attendees = {
  Councillors: "Councillor 1, Councillor 2, Councillor 3", 
  HackneyStaff: "Staff Member 1", 
  NumberOfAttendees: 4}

storiesOf('Attendees', module)
  .add("opens correctly in editable mode", () => (
    <Attendees attendees={attendees} onChangeAttendees={() => {}} readOnly={false}/>
  ))
  .add("opens correctly in read only mode", () => (
    <Attendees 
      onChangeAttendees={() => {}} 
      readOnly={true}
      attendees={attendees}
      />
  ));