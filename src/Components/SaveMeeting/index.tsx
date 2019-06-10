import React from 'react';
import './index.css';
import { IIssue } from '../Issues'
import { SaveMeetingInputModel } from '../../UseCases/SaveMeeting'
import { IServiceProvider, ServiceContext } from '../../ServiceContext';
import { ISaveMeetingUseCase } from '../../Boundary/SaveMeeting';

export interface ISaveMeetingProps {
  issues: Array<IIssue>,
  signature: string,
  onSaveComplete: () => void
}

export interface ISaveMeetingState {
  isAttemptingToSave: boolean,
}

export class SaveMeeting extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  public static contextType = ServiceContext;
  private readonly saveMeeting: ISaveMeetingUseCase;

  public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.saveMeeting = context.get<ISaveMeetingUseCase>("ISaveMeetingUseCase");

    this.state = {
      isAttemptingToSave: false
    }
  }

  handleSaveMeeting() {
    this.setState({ isAttemptingToSave: true });
    let outputModel = this.saveMeeting.Execute(new SaveMeetingInputModel(this.props.issues, this.props.signature));
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
        <div><button id="save-meeting" className="button btn-primary" onClick={this.handleSaveMeeting.bind(this)} >Save and email issue list to TRA</button></div>
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