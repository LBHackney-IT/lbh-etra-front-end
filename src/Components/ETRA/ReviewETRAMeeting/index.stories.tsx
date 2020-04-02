import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewETRAMeeting from '.';

storiesOf('Review Meeting', module)
  .add("opens correctly", () => (
    <ReviewETRAMeeting isComplete={false} traId={1} meetingName="Test Meeting" onSaveComplete={() => {}}/>
  ));