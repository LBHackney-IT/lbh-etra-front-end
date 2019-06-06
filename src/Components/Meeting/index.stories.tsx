import React from 'react';
import { storiesOf } from '@storybook/react';
import Meeting from '.';

storiesOf('Meeting', module)
  .add("opens correctly", () => (
    <Meeting traName="Gotham City"/>
  ));