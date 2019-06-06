import React from 'react';
import './index.css';
import { IIssue } from '../Issues'
import { SaveMeetingUseCase, SaveMeetingInputModel } from '../../UseCases/SaveMeeting'

export interface ISaveMeetingProps {
  issues: Array<IIssue>,
  signature: string,
  onSaveComplete: () => void
}

export interface ISaveMeetingState {
  isAttemptingToSave: boolean,
}

export class SaveMeeting extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  public constructor(props: ISaveMeetingProps) {
    super(props);
    this.state = {
      isAttemptingToSave: false
    }
  }

  handleSaveMeeting() {
    this.setState({ isAttemptingToSave: true });
    let saveMeetingUseCase = new SaveMeetingUseCase();
    let outputModel = saveMeetingUseCase.Execute(new SaveMeetingInputModel(this.props.issues, this.props.signature));
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
        <div><button id="save-meeting" className="button" onClick={this.handleSaveMeeting.bind(this)} >Save and email issue list to TRA</button></div>
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