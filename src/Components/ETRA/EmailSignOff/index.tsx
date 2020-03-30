import React from 'react';
import './index.css';
import { IIssue } from '../../../Domain/Issues'
import { IServiceProvider, ServiceContext } from '../../../ServiceContext';
import { ISaveMeetingDraftUseCase } from '../../../Boundary/SaveMeetingDraft';
import { ISignOffMeetingUseCase } from '../../../Boundary/SignOffMeeting';
import { ICreateMeetingUseCase } from '../../../Boundary/CreateMeeting'
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

export interface IUnreviewedMeetingModel {
  traId: number;
  meetingName: string;
  issues: Array<IIssue>;
  meetingAttendance: IAttendees;
}

export class UnreviewedMeetingModel implements IUnreviewedMeetingModel {  
  public readonly traId: number;
  meetingName: string;
  issues: IIssue[];
  meetingAttendance: IAttendees;

  constructor(traId: number, meetingName: string, issues: IIssue[], attendees: IAttendees){
      this.traId = traId;
      this.meetingName = meetingName;
      this.issues = issues;
      this.meetingAttendance = attendees;
  }
}


export class EmailSignOff extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  public static contextType = ServiceContext;
  private readonly createMeeting: ICreateMeetingUseCase;
  public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.createMeeting = context.get<ICreateMeetingUseCase>("ICreateMeetingUseCase");
    
    this.state = {
      isAttemptingToSave: false,
      isValid: this.checkIsValid(this.props),
      redirectToLandingPage: false
    }
  }
 
  componentWillReceiveProps(newProps: ISaveMeetingProps){
    this.setState({isValid: this.checkIsValid(newProps)})
   
  }

  private checkIsValid(props: ISaveMeetingProps){
    if(isNaN(props.attendees.attendees) || props.attendees.attendees < 1){
      return false;
    }
    
    return true;
  }

  getUnreviewedMeetingModel = () : IUnreviewedMeetingModel => {
    return new UnreviewedMeetingModel(
      this.props.traId,
      this.props.meetingName,
      this.props.issues,
      this.props.attendees
    );
  }

  handleReviewLater = async () => { 
    this.setState({ isAttemptingToSave: true });
    /*const successful = await this.createMeeting.Execute(this.getUnreviewedMeetingModel());

    if (successful) {
      this.props.onReviewLater();
    }
    else {
      this.setState({ isAttemptingToSave: false });
    }*/
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

  handleSaveDraft = () => {
    this.setState({ isAttemptingToSave: true });
    /*const successful = this.saveMeetingDraft.Execute(this.getMeetingModel());

    if (successful) {
      this.setState({ redirectToLandingPage: true });
    }
    else {
      this.setState({ isAttemptingToSave: false });
    }*/
  }

  render() {
    if(this.state.redirectToLandingPage){
      return <Redirect to={{
        pathname: "/etra/saved/",
        state: { meetingname: this.props.meetingName }
      }} />
    }

    if(this.state.isAttemptingToSave){
      return this.renderSpinner();
    }

    return this.renderSaveMeetingButtons();
  }
  
  private renderSaveMeetingButtons() {
    return (
      <div>
        Please ensure you have agreed the list of actions with the TRA representative before emailing them. 
        Once the email has been sent, the actions will no longer be editable.
        <button 
          className="button btn-primary btn-stacked button-margin" 
          id="review-later" 
          onClick={this.handleReviewLater}
          disabled={!this.state.isValid  || !this.props.isSessionLive
          }>
            Save and email issues to TRA for sign off
        </button>
      </div>
    );
  }

  private renderSpinner() {
    return (
      <div className="spinner-wrapper">
       <div className="loading-spinner"><div></div><div></div><div></div></div>
      </div>
    );
  }
}

export default EmailSignOff;