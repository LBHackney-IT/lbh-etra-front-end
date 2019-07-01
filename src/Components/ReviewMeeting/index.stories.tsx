import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewMeeting from '.';

storiesOf('Review Meeting', module)
  .add("opens correctly", () => (
    <ReviewMeeting traId={1} meetingName="Test Meeting" onSaveComplete={() => {}}/>
  ));