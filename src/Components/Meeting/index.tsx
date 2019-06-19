import React from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';
import ReviewMeeting from '../ReviewMeeting';
import RecordIssues from '../RecordIssues'
import Attendees, { IAttendees } from '../Attendees';

export interface IMeetingProps {
  traName: string,
  dateOfMeeting: Date
}

export interface IMeetingState {
  meetingCreated: boolean,
  issues: Array<IIssue>,
  attendees: IAttendees
}
export class Meeting extends React.Component<IMeetingProps, IMeetingState> {

  public constructor(props: IMeetingProps) {
    super(props);
    this.state = {
      meetingCreated: false,
      issues: [],
      attendees: {
        Councillors: "",
        HackneyStaff: "",
        NumberOfAttendees: 0
      }
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

  onChangeAttendees = (newAttendees: IAttendees): void => {
    this.setState({attendees:newAttendees})
  }
  onChangeIssues = (newIssues: Array<IIssue>): void => {
    this.setState({issues: newIssues})
  }

  render() {
    return (
      <div>
        <div className="back-arrow"> &#60;</div><div className="back-link"><a id="lnkBack" href="#">Back</a></div>

        <h1 className="tra-name-etra-meet">{this.props.traName} ETRA meeting {this.getMeetingDateString()}</h1>
        <Attendees onChangeAttendees={this.onChangeAttendees} readOnly={this.state.meetingCreated}/>
        <div className="record-issues-padding">
          <RecordIssues onChangeIssues ={this.onChangeIssues} issues={this.state.issues}/>
        </div>
        <ReviewMeeting
          attendees={this.state.attendees}
          issues={this.state.issues}
          onReviewComplete={this.onSaveComplete}
        />
      </div>);
  }
}

export default Meeting;