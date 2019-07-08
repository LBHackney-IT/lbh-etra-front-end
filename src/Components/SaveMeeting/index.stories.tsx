import React from 'react';
import { storiesOf } from '@storybook/react';
import SaveMeeting from '.';

storiesOf('Save Meeting', module)
  .add("opens correctly", () => (
    <SaveMeeting
      signOffMode={false}
      traId={1}
      meetingName="Test Meeting"
      signOff={{signature: "", name: "", role: ""}}
      issues={[]} 
      attendees={{Councillors: "", HackneyStaff: "", Attendees: 0}} 
      onReviewLater={() => {}}
      onReviewNow={() => {}}/>
  ));