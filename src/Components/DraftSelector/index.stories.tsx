import React from 'react';
import { storiesOf } from '@storybook/react';
import DraftSelector from '.';
import { IMeetingModel } from '../../Domain/Meeting';
import { BrowserRouter as Router } from "react-router-dom";

const mockMeeting : IMeetingModel = {
  id: "",
  traId: 1,
  meetingName: "Test Meeting Name",
  issues: [],
  attendees: {
    Councillors: "",
    HackneyStaff: "",
    NumberOfAttendees: 0
  },
  signOff: {
    signature: "",
    name: "",
    role: ""
  }
}

storiesOf('Draft Selector', module)
  .add("opens correctly", () => (
    <Router>
      <DraftSelector meeting={mockMeeting} />
    </Router>
  ));