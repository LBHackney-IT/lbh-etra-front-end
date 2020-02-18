import React from 'react';
import { storiesOf } from '@storybook/react';
import Attendees from './index';

const attendees = {
  councillors: "Councillor 1, Councillor 2, Councillor 3",
  hackneyStaff: "Staff Member 1",
  attendees: 4}

storiesOf('Attendees', module)
  .add("opens correctly in editable mode", () => (
    <Attendees isComplete={false} attendees={attendees} onChangeAttendees={() => {}} readOnly={false} />
  ))
  .add("opens correctly in read only mode", () => (
    <Attendees 
      onChangeAttendees={() => {}} 
      readOnly={true}
      attendees={attendees}
      isComplete={true}
      />
  ));