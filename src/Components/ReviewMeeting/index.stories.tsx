import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewMeeting from '.';

storiesOf('Review Now', module)
  .add("opens correctly", () => (
    <ReviewMeeting />
  ));