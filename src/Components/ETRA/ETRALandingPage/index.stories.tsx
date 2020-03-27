import React from 'react';
import { storiesOf } from '@storybook/react';
import ETRALandingPage from '.';

storiesOf('Landing Page', module)
  .add("opens correctly", () => (
    <ETRALandingPage location={{pathname: "", search: "", hash: "", state: {}}} />
  ));