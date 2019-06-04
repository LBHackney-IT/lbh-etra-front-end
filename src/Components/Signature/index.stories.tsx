import React from 'react';
import { storiesOf } from '@storybook/react';
import Signature from './index'

storiesOf('Signature', module)
    .add("displays with default props", () => (
    <Signature />
  ))
  .add("displays with height of 100", () => (
    <Signature height={100} />
  ))
  .add("displays without clear button", () => (
    <Signature displayClearButton={false} />
  ));