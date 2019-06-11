import React from 'react';
import { storiesOf } from '@storybook/react';
import Attendees from '.';

storiesOf('Attendees', module)
  .add("opens correctly", () => (
    <Attendees onChangeAttendees={() => {}}/>
  ));