import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordIssues from '.';

storiesOf('RecordIssues', module)
  .add("opens correctly", () => (
    <RecordIssues blocks={[]} issues={[]} onChangeIssues={() => {}} readOnly={false}/>
  ))
  .add("opens correctly in read only mode", () => (
    <RecordIssues blocks={[]} issues={[]} onChangeIssues={() => {}} readOnly={true}/>
  ));
