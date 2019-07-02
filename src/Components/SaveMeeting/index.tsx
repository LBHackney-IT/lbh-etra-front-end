import React from 'react';
import './index.css';
import { IIssue } from '../../Domain/Issues'
import { IServiceProvider, ServiceContext } from '../../ServiceContext';
import { ISaveMeetingDraftUseCase } from '../../Boundary/SaveMeetingDraft';
import { MeetingModel } from '../../Domain/Meeting';
import { IAttendees } from '../../Domain/Attendees';
import { ISignOff } from '../../Domain/SignOff';
import { Redirect } from 'react-router-dom';

export interface ISaveMeetingProps {
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

  public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.saveMeetingDraft = context.get<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase");

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
    if(props.attendees.NumberOfAttendees <= 0){
      return false;
    }
    
    return true;
  }

  handleSaveDraft = () => {
    this.setState({ isAttemptingToSave: true });
    const successful = this.saveMeetingDraft.Execute(
      new MeetingModel(
        this.props.traId,
        this.props.meetingName,
        this.props.issues, 
        this.props.attendees, 
        this.props.signOff,
        this.props.meetingId, 
      )
    );

    if (successful) {
      this.setState({ redirectToLandingPage: true });
    }
    else {
      this.setState({ isAttemptingToSave: false });
    }
  }

  // handleReviewLater = () => {
  //   this.handleSaveMeeting(this.props.onReviewLater);
  // }

  // handleSaveMeeting(callback: () => void){ 
  //   this.setState({ isAttemptingToSave: true });
  //   const successful = this.saveMeetingDraft.Execute(
  //     new MeetingModel(
  //       this.props.traId,
  //       this.props.meetingName,
  //       this.props.issues, 
  //       this.props.attendees, 
  //       this.props.signOff,
  //       this.props.meetingId, 
  //     )
  //   );

  //   if (successful) {
  //     callback();
  //   }
  //   else {
  //     this.setState({ isAttemptingToSave: false });
  //   }
  // }

  render() {
    if(this.state.redirectToLandingPage){
      return <Redirect to="" />
    }

    if (!this.state.isAttemptingToSave) {
      return this.renderSaveMeetingButtons();
    }
    else if (this.state.isAttemptingToSave) {
      return this.renderSpinner();
    }
  }

  private renderSaveMeetingButtons() {
    return (
      <div>
        <button 
          id="save-meeting" 
          className="button btn-primary button-margin" 
          //onClick={this.handleReviewNow}
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
          //onClick={this.handleReviewLater}
          disabled={!this.state.isValid}>
            Email issues to TRA for sign off
        </button>
      </div>
    );
  }

  private renderSpinner() {
    return (
      <div className="spinner">
        SPINNER
        </div>
    );
  }
}

export default SaveMeeting;