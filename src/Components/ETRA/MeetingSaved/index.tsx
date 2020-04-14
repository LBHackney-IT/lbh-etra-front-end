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
import getEnvVariable from '../../../Utilities/environmentVariables';

const workTrayUrl = getEnvVariable("WORK_TRAY_URL")

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
        <h1 className="tra-name-etra-meet">{this.props.location.state.meetingname}</h1>
        <section className="lbh-page-announcement">
          <h3 className="lbh-page-announcement__title">ETRA Meeting has been saved locally</h3>
          <div className="lbh-page-announcement__content">
            <p>You need to synchronise  this meeting with Manage a Tenancy. Do not close this page in your web browser or tuen off your 
            iPad until you have synchronised it.<br/>&nbsp;</p>
            <p>If you are online (4G/wifi) you can sign off the meeting with the TRA representative now.<br/>&nbsp;</p>
              <p>If you are offline or are unable to sign off the meeting now, you can sign off the draft of the meeting later.
              <br/>&nbsp;
              </p>
          </div>
          <div style={{marginTop: "20px"}}>
          <a href={workTrayUrl} role="button" className="govuk-button  lbh-button" data-module="govuk-button">
          Sign in to Manage a Tenancy
        </a>&nbsp;&nbsp;<span style={{paddingLeft: "25px", paddingTop: "7px"}}>
          <Link to={{pathname: "/etra/"}}
            id="signoffemail" href="#">Return to ETRA meeting page</Link></span>
            </div>
        </section>
    </div>
    );
  }
}
export default MeetingSaved;