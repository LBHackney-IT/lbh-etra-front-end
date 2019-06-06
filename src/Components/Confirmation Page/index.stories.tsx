import React from 'react';
import { storiesOf } from '@storybook/react';
import Confirmation from '.';

storiesOf('Confirmation', module)
  .add("opens correctly", () => (
    <Confirmation />
  ));