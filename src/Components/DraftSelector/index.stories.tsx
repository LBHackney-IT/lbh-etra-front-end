import React from 'react';
import { storiesOf } from '@storybook/react';
import DraftSelector from '.';
import { IMeetingModel } from '../../Domain/Meeting';
import { BrowserRouter as Router } from "react-router-dom";
import { ITraInfo } from '../../Boundary/TRAInfo';

const mockMeeting : IMeetingModel = {
  id: "",
  traId: 1,
  meetingName: "Test Meeting Name",
  issues: [],
  meetingAttendance: {
    councillors: "",
    hackneyStaff: "",
    attendees: 0
  },
  signOff: {
    signature: "",
    name: "",
    role: ""
  },
  isSignedOff: false
}

const mockTra: ITraInfo = {
  patch: {patchId:"", officerName: "", id: "", tras: []},
  tra: {id: 1, name: "", blocks: []}
}

storiesOf('Draft Selector', module)
  .add("opens correctly", () => (
    <Router>
      <DraftSelector meeting={mockMeeting} tra={mockTra}/>
    </Router>
  ));