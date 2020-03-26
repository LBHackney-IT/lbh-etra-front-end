import React from 'react';
import './index.css';
import { IIssue } from '../../../Domain/Issues'
import { IServiceProvider, ServiceContext } from '../../../ServiceContext';
import { ISaveMeetingDraftUseCase } from '../../../Boundary/SaveMeetingDraft';
import { MeetingModel, IMeetingModel } from '../../../Domain/Meeting';
import { IAttendees } from '../../../Domain/Attendees';
import { ISignOff } from '../../../Domain/SignOff';
import { Redirect, Link } from 'react-router-dom';
import { Location } from 'history';
import Attendees from '../../Attendees';
import RecordIssues from '../../RecordIssues';
export interface IMeetingNameRedirectProps {
  meetingname: string;
}

export interface IMeetingProps {
  location: Location<IMeetingNameRedirectProps>
}

export class MeetingSaved extends React.Component<IMeetingProps> {
  
  public constructor(props: IMeetingProps) {
    super(props);
  }

  render() {
    if(!this.props.location.state){
      return <Redirect to={{
        pathname: "/etra/"
      }} />
    }
    return(
      <div>
        {this.props.location.state.meetingname}
      <div className="read-only-background">
        <div className="landing-page-header" data-test="header-text">ETRA Meeting has been saved locally
        <br />
      </div>
      <div className="issue">
        You need to synchronise  this meeting with Manage a Tenancy. Do not close this page in your web browser or tuen off your 
        iPad until you have synchronised it.
        <br />
      </div>
      <div className="issue">
        If you are online (4G/wifi) you can sign off the meeting with the TRA representative now.
        <br />
      </div>
      <div className="issue">
        If you are offline or are unable to sign off the meeting now, you can sign off the draft of the meeting later.
        <br />
      </div>
      <div className="button-wrapper">
          <button
          id="delete-issue"
          className="button btn-secondary"
          data-test="delete-issue">
          Cancel
        </button>
        </div>
    </div>
  </div>
    );
  }
}
export default MeetingSaved;