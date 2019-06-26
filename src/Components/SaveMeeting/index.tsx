import React, { isValidElement } from 'react';
import './index.css';
import { IIssue } from '../../Domain/Issues'
import { SaveMeetingUseCase, SaveMeetingInputModel } from '../../UseCases/SaveMeeting'
import { IServiceProvider, ServiceContext } from '../../ServiceContext';
import { ISaveMeetingUseCase } from '../../Boundary/SaveMeeting';
import { IAttendees } from '../Attendees';

export interface ISaveMeetingProps {
  issues: Array<IIssue>,
  signature: string,
  onReviewNow: () => void,
  onReviewLater: () => void,
  attendees: IAttendees,
  repName:string
}

export interface ISaveMeetingState {
  isAttemptingToSave: boolean
  isValid: boolean
}

export class SaveMeeting extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  public static contextType = ServiceContext;
  private readonly saveMeeting: ISaveMeetingUseCase;

  public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.saveMeeting = context.get<ISaveMeetingUseCase>("ISaveMeetingUseCase");

    this.state = {
      isAttemptingToSave: false,
      isValid: this.checkIsValid(this.props)
    }
  }

  componentWillReceiveProps(newProps: ISaveMeetingProps){
    this.setState({isValid: this.checkIsValid(newProps)})
  }

  private checkIsValid(props: ISaveMeetingProps){
    if(props.attendees.NumberOfAttendees <= 0 || props.repName==""){
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
    let outputModel = this.saveMeeting.Execute(new SaveMeetingInputModel(this.props.issues, this.props.signature, this.props.attendees, this.props.repName));
    if (outputModel.successful) {
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