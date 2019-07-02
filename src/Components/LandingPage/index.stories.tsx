import React from 'react';
import { storiesOf } from '@storybook/react';
import LandingPage from '.';

storiesOf('Landing Page', module)
  .add("opens correctly", () => (
    <LandingPage location={{pathname: "", search: "", hash: "", state: {}}} />
  ));