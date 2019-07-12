import React from 'react';
import './index.css';
import { IIssue } from '../../Domain/Issues'
import { IServiceProvider, ServiceContext } from '../../ServiceContext';
import { ISaveMeetingDraftUseCase } from '../../Boundary/SaveMeetingDraft';
import { MeetingModel, IMeetingModel, IUnreviewedMeetingModel, UnreviewedMeetingModel } from '../../Domain/Meeting';
import { IAttendees } from '../../Domain/Attendees';
import { ISignOff } from '../../Domain/SignOff';
import { Redirect } from 'react-router-dom';
import { ICreateMeetingUseCase } from '../../Boundary/CreateMeeting';

export interface ISaveMeetingProps {
  signOffMode: boolean,
  traId: number,
  meetingId?: string,
  meetingName: string,
  attendees: IAttendees,
  issues: Array<IIssue>,
  signOff: ISignOff,
  onReviewNow: () => void,
  onReviewLater: () => void,
}

export interface ISaveMeetingState {
  isAttemptingToSave: boolean;
  isValid: boolean;
  redirectToLandingPage: boolean;
}

export class SaveMeeting extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  public static contextType = ServiceContext;
  private readonly saveMeetingDraft: ISaveMeetingDraftUseCase;
  private readonly createMeeting: ICreateMeetingUseCase;

  public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.saveMeetingDraft = context.get<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase");
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
    if(props.attendees.attendees <= 0){
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
  getMeetingModelWithSignatureTrimmed = (): IMeetingModel => {
    const trimmedSignatureSignoff:ISignOff = {
      signature:this.props.signOff.signature.slice(22) ,
      name: this.props.signOff.name,
      role: this.props.signOff.role
    }
    return new MeetingModel(
      this.props.traId,
      this.props.meetingName,
      this.props.issues, 
      this.props.attendees, 
      trimmedSignatureSignoff,
      this.props.meetingId, 
    )
  }

  getUnreviewedMeetingModel = () : IUnreviewedMeetingModel => {
    return new UnreviewedMeetingModel(
      this.props.traId,
      this.props.meetingName,
      this.props.issues,
      this.props.attendees
    );
  }
  handleSaveDraft = () => {
    this.setState({ isAttemptingToSave: true });
    const successful = this.saveMeetingDraft.Execute(this.getMeetingModel());

    if (successful) {
      this.setState({ redirectToLandingPage: true });
    }
    else {
      this.setState({ isAttemptingToSave: false });
    }
  }

  handleSaveMeeting = async () => { 
    this.setState({ isAttemptingToSave: true });
    const successful = await this.createMeeting.Execute(this.getMeetingModelWithSignatureTrimmed());

    if (successful) {
      this.props.onReviewNow();
    }

    else {
      this.setState({ isAttemptingToSave: false });
    }
  }

  handleReviewLater = async () => { 
    this.setState({ isAttemptingToSave: true });
    const successful = await this.createMeeting.Execute(this.getUnreviewedMeetingModel());

    if (successful) {
      this.props.onReviewLater();
    }
    else {
      this.setState({ isAttemptingToSave: false });
    }
  }

  render() {
    if(this.state.redirectToLandingPage){
      return <Redirect to="" />
    }

    if(this.state.isAttemptingToSave){
      return this.renderSpinner();
    }

    return this.renderSaveMeetingButtons();
  }

  private renderSaveMeetingButtons() {
    if(this.props.signOffMode){
      return (
        <button 
        id="save-meeting" 
        className="button btn-primary button-margin" 
        onClick={this.handleSaveMeeting}
        disabled={!this.state.isValid}>
          I confirm I have reviewed these issues
        </button>
      )
    }

    return (
      <div>
        <button 
          id="save-meeting" 
          className="button btn-primary button-margin" 
          onClick={this.handleSaveMeeting}
          disabled={!this.state.isValid}>
            Save the signed off issue list and email to TRA
        </button>
        <button 
          id="save-draft" 
          className="button btn-primary btn-stacked button-margin" 
          onClick={this.handleSaveDraft}
          disabled={!this.state.isValid}>
            Save issues for review with TRA later
        </button>
        <button 
          className="button btn-primary btn-stacked button-margin" 
          id="review-later" 
          onClick={this.handleReviewLater}
          disabled={!this.state.isValid}>
            Email issues to TRA for sign off
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

export default SaveMeeting;