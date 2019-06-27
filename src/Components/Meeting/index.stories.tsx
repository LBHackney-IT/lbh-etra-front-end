import React from 'react';
import { storiesOf } from '@storybook/react';
import Meeting from '.';

const location = {
  pathname: "",
  search: "",
  hash: "",
  state: {
    selectedTra: {
      id: 1,
      name: "Gotham City TRA",
      blocks: []
    }
  }
}

storiesOf('Meeting', module)
  .add("opens correctly", () => (
    <Meeting location={location}/>
  ));