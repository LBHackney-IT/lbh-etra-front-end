import React from 'react';
import { storiesOf } from '@storybook/react';
import Confirmation from '.';
import { SignOff } from '../../Domain/SignOff';

storiesOf('Confirmation', module)
  .add("opens correctly", () => (
    <Confirmation signOff={new SignOff("", "Rep Name", "Rep Role")} />
  ));