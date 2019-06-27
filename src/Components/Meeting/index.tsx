import React from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';
import ReviewMeeting from '../ReviewMeeting';
import RecordIssues from '../RecordIssues'
import Attendees, { IAttendees } from '../Attendees';
import { ITra } from '../../Domain/Area';
import { Location } from 'history';

interface IMeetingRedirectProps {
  selectedTra: ITra;
}

export interface IMeetingProps {
  location: Location<IMeetingRedirectProps>
}

export interface IMeetingState {
  shouldLoad: boolean,
  meetingCreated: boolean,
  issues: Array<IIssue>,
  attendees: IAttendees,
  dateOfMeeting: Date;
}

export class Meeting extends React.Component<IMeetingProps, IMeetingState> {

  private selectedTra: ITra;

  public constructor(props: IMeetingProps) {
    super(props);

    this.selectedTra = this.props.location.state.selectedTra;
    const shouldLoad : boolean = this.selectedTra !== undefined;

    this.state = {
      shouldLoad: shouldLoad,
      meetingCreated: false,
      issues: [],
      attendees: {
        Councillors: "",
        HackneyStaff: "",
        NumberOfAttendees: 0
      },
      dateOfMeeting: new Date()
    }

    console.log(this.state.shouldLoad);
  }

  getMeetingDateString = (): string => {
    return this.state.dateOfMeeting.toLocaleDateString('en-GB');
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

        <h1 className="tra-name-etra-meet">{this.selectedTra.name} meeting {this.getMeetingDateString()}</h1>
        <Attendees onChangeAttendees={this.onChangeAttendees} readOnly={this.state.meetingCreated}/>
        <div className="record-issues-padding">
          <RecordIssues onChangeIssues ={this.onChangeIssues} issues={this.state.issues}/>
        </div>
        <ReviewMeeting
          attendees={this.state.attendees}
          issues={this.state.issues}
          onSaveComplete={this.onSaveComplete}
        />
      </div>);
  }
}

export default Meeting;