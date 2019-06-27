import React from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';
import ReviewMeeting from '../ReviewMeeting';
import RecordIssues from '../RecordIssues'
import Attendees, { IAttendees } from '../Attendees';
import { ITra } from '../../Domain/Area';
import { Location } from 'history';
import { Link } from 'react-router-dom';

interface IMeetingRedirectProps {
  selectedTra: ITra;
}

export interface IMeetingProps {
  location: Location<IMeetingRedirectProps>
}

export interface IMeetingState {
  meetingCreated: boolean,
  issues: Array<IIssue>,
  attendees: IAttendees,
  dateOfMeeting: Date;
  backToLandingPage: boolean;
}

export class Meeting extends React.Component<IMeetingProps, IMeetingState> {

  private readonly selectedTra: ITra | undefined;
  private readonly meetingName: string;

  public constructor(props: IMeetingProps) {
    super(props);

    this.selectedTra = this.props.location.state && this.props.location.state.selectedTra;

    this.state = {
      meetingCreated: false,
      issues: [],
      attendees: {
        Councillors: "",
        HackneyStaff: "",
        NumberOfAttendees: 0
      },
      dateOfMeeting: new Date(),
      backToLandingPage: false
    }

    this.meetingName = `${this.selectedTra.name} ETRA meeting ${this.getMeetingDateString()}`;
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
    if(!this.selectedTra){
      return (
        <div>
          {this.renderBackArrow()}
          <div className="no-meeting-selected">
            <p>You do not have a meeting in progress.</p>
            <p>
              Please return to the &nbsp;
              <Link to="">landing page.</Link>
            </p>
          </div>
        </div>
      )
    }

    return (
      <div>
        {this.renderBackArrow()}
        <h1 className="tra-name-etra-meet">{this.selectedTra.name} meeting {this.getMeetingDateString()}</h1>
        <Attendees onChangeAttendees={this.onChangeAttendees} readOnly={this.state.meetingCreated}/>
        <div className="record-issues-padding">
          <RecordIssues readOnly={this.state.meetingCreated} onChangeIssues ={this.onChangeIssues} issues={this.state.issues}/>
        </div>
        <ReviewMeeting
          meetingName={this.meetingName}
          attendees={this.state.attendees}
          issues={this.state.issues}
          onSaveComplete={this.onSaveComplete}
        />
      </div>);
  }

  renderBackArrow(){
    return (
      <>
        <div className="back-arrow"> &#60;</div>
        <div className="back-link">
          <Link to="" id="lnkBack" href="#">Back</Link>
        </div>
      </>
    );
  }
}

export default Meeting;