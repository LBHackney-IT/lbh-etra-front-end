import React from 'react';
import { storiesOf } from '@storybook/react';
import ConfirmLater from '.';

storiesOf('Confirm Later', module)
  .add("opens correctly", () => (
    <ConfirmLater />
  ));