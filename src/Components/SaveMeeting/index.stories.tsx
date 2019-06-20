import React from 'react';
import { storiesOf } from '@storybook/react';
import SaveMeeting from '.';

storiesOf('Save Meeting', module)
  .add("opens correctly", () => (
    <SaveMeeting 
      signature="" 
      issues={[]} 
      attendees={{Councillors: "", HackneyStaff: "", NumberOfAttendees: 0}} 
      onReviewLater={() => {}}
      onReviewNow={() => {}}/>
  ));