import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordIssues from '.';

storiesOf('RecordIssues', module)
  .add("opens correctly", () => (
    <RecordIssues issues={[]} onChangeIssues={() => {}} readOnly={false}/>
  ))
  .add("opens correctly in read only mode", () => (
    <RecordIssues issues={[]} onChangeIssues={() => {}} readOnly={true}/>
  ));
