import React, { isValidElement } from 'react';
import './index.css';
import { IIssue } from '../../Domain/Issues'
import { SaveMeetingDraftUseCase } from '../../UseCases/SaveMeetingDraft'
import { IServiceProvider, ServiceContext } from '../../ServiceContext';
import { ISaveMeetingDraftUseCase } from '../../Boundary/SaveMeetingDraft';
import { IAttendees } from '../Attendees';
import { MeetingModel } from '../../Domain/Meeting';

export interface ISaveMeetingProps {
  issues: Array<IIssue>,
  signature: string,
  onReviewNow: () => void,
  onReviewLater: () => void,
  attendees: IAttendees
}

export interface ISaveMeetingState {
  isAttemptingToSave: boolean
  isValid: boolean
}

export class SaveMeeting extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  public static contextType = ServiceContext;
  private readonly saveMeeting: ISaveMeetingDraftUseCase;

  public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.saveMeeting = context.get<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase");

    this.state = {
      isAttemptingToSave: false,
      isValid: this.checkIsValid(this.props)
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

  handleReviewNow = () => {
    this.handleSaveMeeting(this.props.onReviewNow);
  }

  handleReviewLater = () => {
    this.handleSaveMeeting(this.props.onReviewLater);
  }

  handleSaveMeeting(callback: () => void){
    this.setState({ isAttemptingToSave: true });
    const successful = this.saveMeeting.Execute(new MeetingModel("Test Meeting", this.props.issues, this.props.signature, this.props.attendees));
    if (successful) {
      callback();
    }
    else {
      this.setState({ isAttemptingToSave: false });
    }
  }

  render() {
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
          className="button btn-primary" 
          onClick={this.handleReviewNow}
          disabled={!this.state.isValid}>
            Save and email issue list to TRA
        </button>
        <button 
          className="button btn-primary btn-stacked review-button" 
          id="review-later" 
          onClick={this.handleReviewLater}
          disabled={!this.state.isValid}>
            TRA representative to review later
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