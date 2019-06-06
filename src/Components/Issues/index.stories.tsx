import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewNow from '.';

storiesOf('Review Now', module)
  .add("opens correctly", () => (
    <ReviewNow />
  ));