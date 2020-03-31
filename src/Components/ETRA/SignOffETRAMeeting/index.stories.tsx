import React from 'react';
import { storiesOf } from '@storybook/react';
import SignOffETRAMeeting  from '.';

const location = {
  pathname: "",
  search: "",
  hash: "",
  state: {
    selectedTra: {
      patch: {
        id: "",
        officerName: "Commissioner Gordon",
        patchId: "BM1",
        tras: []
      },
      tra: {
        id: 1,
        name: "Gotham City TRA",
        blocks: []
      }
    }
  }
}

storiesOf('Meeting', module)
  .add("opens correctly", () => (
    <SignOffETRAMeeting location={location}/>
  ));