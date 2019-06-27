import React from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';
import ReviewMeeting from '../ReviewMeeting';
import RecordIssues from '../RecordIssues'
import Attendees from '../Attendees';
import { Location } from 'history';
import { Link } from 'react-router-dom';
import { IAttendees } from '../../Domain/Attendees';
import { ITraInfo } from '../../Boundary/TRAInfo';

interface IMeetingRedirectProps {
  selectedTra: ITraInfo;
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

  private readonly selectedTra: ITraInfo | undefined;
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

    this.meetingName = `${this.selectedTra.tra.name} meeting ${this.getMeetingDateString()}`;
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
        <h1 className="tra-name-etra-meet">{this.meetingName}</h1>
        <Attendees onChangeAttendees={this.onChangeAttendees} readOnly={this.state.meetingCreated}/>
        <div className="record-issues-padding">
          <RecordIssues blocks={this.selectedTra.tra.blocks} readOnly={this.state.meetingCreated} onChangeIssues={this.onChangeIssues} issues={this.state.issues}/>
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