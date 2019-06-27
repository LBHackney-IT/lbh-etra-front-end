import React from 'react';
import { storiesOf } from '@storybook/react';
import RepName from '.';

storiesOf('RepName', module)
  .add("opens correctly", () => (
    <RepName onUpdated={(repName: string) => {console.log(`{Representative Name ${repName}}`)}}/>
  ));