import React from 'react';
import './index.css';
import { IIssue } from '../../../Domain/Issues'
import { IServiceProvider, ServiceContext } from '../../../ServiceContext';
import { ISaveMeetingDraftUseCase } from '../../../Boundary/SaveMeetingDraft';
import { MeetingModel, IMeetingModel } from '../../../Domain/Meeting';
import { IAttendees } from '../../../Domain/Attendees';
import { ISignOff } from '../../../Domain/SignOff';
import { Redirect, Link } from 'react-router-dom';
import Attendees from '../../Attendees';
import RecordIssues from '../../RecordIssues';
export interface ISaveMeetingProps {
  signOffMode: boolean,
  traId: number,
  meetingId?: string,
  meetingName: string,
  attendees: IAttendees,
  issues: Array<IIssue>,
  signOff: ISignOff,
  isSessionLive?:boolean
}

export interface ISaveMeetingState {
  isAttemptingToSave: boolean;
  isValid: boolean;
  redirectToLandingPage: boolean;
 
}

export class ConfirmMeetingSaved extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  
  /*public static contextType = ServiceContext;
  private readonly saveMeetingDraft: ISaveMeetingDraftUseCase;*/

  /*public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.saveMeetingDraft = context.get<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase");
    
    this.state = {
      isAttemptingToSave: false,
      isValid: this.checkIsValid(this.props),
      redirectToLandingPage: false
    }
  }*/
 
  componentWillReceiveProps(newProps: ISaveMeetingProps){
    //this.setState({isValid: this.checkIsValid(newProps)})
   
  }

  private checkIsValid(props: ISaveMeetingProps){
    if(isNaN(props.attendees.attendees) || props.attendees.attendees < 1){
      return false;
    }
    
    return true;
  }

  getMeetingModel = () : IMeetingModel => {
    return new MeetingModel(
      this.props.traId,
      this.props.meetingName,
      this.props.issues, 
      this.props.attendees, 
      this.props.signOff,
      this.props.meetingId, 
    );
  }

  render() {
    return(
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
    );
  }
}
export default ConfirmMeetingSaved;