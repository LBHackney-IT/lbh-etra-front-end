import React from 'react';
import { storiesOf } from '@storybook/react';
import Attendees from './index';

storiesOf('Attendees', module)
  .add("opens correctly in editable mode", () => (
    <Attendees onChangeAttendees={() => {}} readOnly={false}/>
  ))
  .add("opens correctly in read only mode", () => (
    <Attendees 
      onChangeAttendees={() => {}} 
      readOnly={true}
      attendees={{Councillors: "Councillor 1, Councillor 2, Councillor 3", HackneyStaff: "Staff Member 1", NumberOfAttendees: 4}}/>
  ));