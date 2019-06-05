import React from 'react';
import { storiesOf } from '@storybook/react';
import Meeting from '.';

storiesOf('Meeting', module)
  .add("opens correctly", () => (
    <Meeting />
  )).add("Meeting is Reviewing Now ", () => (
    <Meeting isReviewingNow={true} />
  ));