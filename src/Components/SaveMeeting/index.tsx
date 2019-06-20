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
  onSaveComplete: () => void
  attendees: IAttendees
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
    if(props.attendees.NumberOfAttendees <= 0){
      return false;
    }
    
    return true;
  }

  handleSaveMeeting() {
    this.setState({ isAttemptingToSave: true });
    let outputModel = this.saveMeeting.Execute(new SaveMeetingInputModel(this.props.issues, this.props.signature, this.props.attendees));
    if (outputModel.successful) {
      this.props.onSaveComplete();
    }
    else {
      this.setState({ isAttemptingToSave: false });
    }
  }

  render() {
    if (!this.state.isAttemptingToSave) {
      return this.renderSaveMeetingButton();
    }
    else if (this.state.isAttemptingToSave) {
      return this.renderSpinner();
    }
  }

  private renderSaveMeetingButton() {
    return (
      <div>
        <button 
          id="save-meeting" 
          className="button btn-primary" 
          onClick={this.handleSaveMeeting.bind(this)}
          disabled={!this.state.isValid}>
            Save and email issue list to TRA
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