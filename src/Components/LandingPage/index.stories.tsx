import React from 'react';
import { storiesOf } from '@storybook/react';
import Meeting from '.';
import LandingPage from '.';

storiesOf('Landing Page', module)
  .add("opens correctly", () => (
    <LandingPage />
  ));