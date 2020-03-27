import React from 'react';
import { storiesOf } from '@storybook/react';
import SaveETRAMeeting from '.';

storiesOf('Save Meeting', module)
  .add("opens correctly", () => (
    <SaveETRAMeeting
      signOffMode={false}
      traId={1}
      meetingName="Test Meeting"
      signOff={{signature: "", name: "", role: ""}}
      issues={[]} 
      attendees={{councillors: "", hackneyStaff: "", attendees: 0}} />
  ));