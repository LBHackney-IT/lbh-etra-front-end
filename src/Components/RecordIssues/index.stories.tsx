import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordIssues from '.';

storiesOf('RecordIssues', module)
  .add("opens correctly", () => (
    <RecordIssues issues={[]} onChangeIssues={() => {}}/>
  ));