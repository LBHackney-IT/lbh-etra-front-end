import React from 'react';
import { IIssue } from '../Issues';
import './index.css';
import ReviewMeeting from '../ReviewMeeting';

export interface IMeetingProps {
  traName: string,
  dateOfMeeting: Date
}

export interface IMeetingState {
  meetingCreated: boolean,
  issues: Array<IIssue>,
}

export class Meeting extends React.Component<IMeetingProps, IMeetingState> {

  public constructor(props: IMeetingProps) {
    super(props);
    this.state = {
      meetingCreated: false,
      issues: [],
    }
  }

  public static defaultProps = {
    dateOfMeeting: new Date()
  };

  getMeetingDateString = (): string => {
    return this.props.dateOfMeeting.toLocaleDateString('en-GB');
  }

  onSaveComplete = (): void => {
    this.setState({ meetingCreated: true })
  }

  render() {
    return (
      <div>
        <div className="back-arrow"> &#60;</div><div className="back-link"><a id="lnkBack" href="#">Back</a></div>
        <h1>{this.props.traName} ETRA meeting {this.getMeetingDateString()}</h1>
        <h2>Attendees Component</h2>
        <h2>Issues Component</h2>
        <ReviewMeeting
          issues={this.state.issues}
          onReviewComplete={this.onSaveComplete}
        />
      </div>);
  }
}

export default Meeting;