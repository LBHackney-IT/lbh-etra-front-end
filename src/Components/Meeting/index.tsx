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
import { IMeetingModel } from '../../Domain/Meeting';

export interface IMeetingRedirectProps {
  selectedTra: ITraInfo;
  meeting?: IMeetingModel;
}

export interface IMeetingProps {
  location: Location<IMeetingRedirectProps>
}

export interface IMeetingState {
  meetingCreated: boolean,
  issues: Array<IIssue>,
  attendees: IAttendees
}

const emptyState : IMeetingState = {
  meetingCreated: false,
  issues: [],
  attendees:
  {
    Councillors: "",
    HackneyStaff: "",
    NumberOfAttendees: 0
  }
}

export class Meeting extends React.Component<IMeetingProps, IMeetingState> {
  private readonly selectedTra: ITraInfo | undefined;
  private readonly meetingId: string | undefined;
  private readonly meetingName: string;

  public constructor(props: IMeetingProps) {
    super(props);

    this.meetingName = "";

    if(!this.props.location || !this.props.location.state || !this.props.location.state.selectedTra){
      return;
    }

    this.selectedTra = this.props.location.state.selectedTra;

    const existingMeeting = this.props.location.state.meeting;

    if(existingMeeting){
      this.meetingId = existingMeeting.id;
      this.meetingName = existingMeeting.meetingName;
      this.state = {
        meetingCreated: false,
        issues: existingMeeting.issues,
        attendees: existingMeeting.attendees
      }
    }
    else {
      this.meetingName = this.buildMeetingName(this.selectedTra.tra.name, new Date());
      this.state = emptyState;
    }
  }

  buildMeetingName = (traName: string, date: Date): string => {
    return `${traName} meeting ${date.toLocaleDateString('en-GB')}`;
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
      return this.renderErrorScreen();
    }

    return (
      <div>
        {this.renderBackArrow()}
        <h1 className="tra-name-etra-meet">{this.meetingName}</h1>
        <Attendees attendees={this.state.attendees} onChangeAttendees={this.onChangeAttendees} readOnly={this.state.meetingCreated}/>
        <div className="record-issues-padding">
          <RecordIssues blocks={this.selectedTra.tra.blocks} readOnly={this.state.meetingCreated} onChangeIssues={this.onChangeIssues} issues={this.state.issues}/>
        </div>
        <ReviewMeeting
          traId={this.selectedTra.tra.id}
          meetingId={this.meetingId}
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
  };

  renderErrorScreen(){
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
    );
  };
}

export default Meeting;