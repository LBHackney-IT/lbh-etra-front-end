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
import queryString from 'query-string';
import { ServiceContext, IServiceProvider } from '../../ServiceContext';
import { IGetMeetingUseCase } from '../../Boundary/GetMeeting';

export interface IMeetingRedirectProps {
  selectedTra: ITraInfo;
  meeting?: IMeetingModel;
}

export interface IMeetingProps {
  location: Location<IMeetingRedirectProps>
}

export interface IMeetingState {
  shouldDisplay: boolean,
  detailsEditable: boolean,
  signOffEditable: boolean,
  errorMessage: string,
  signOffMode: boolean,
  meeting: IMeetingModel,
}

const emptyState : IMeetingState = {
  shouldDisplay: false,
  detailsEditable: false,
  signOffEditable: false,
  errorMessage: "",
  signOffMode: false,
  meeting: {
    id: "",
    traId: -1,
    meetingName: "",
    issues: [],
    meetingAttendance:
    {
      Councillors: "",
      HackneyStaff: "",
      NumberOfAttendees: 0
    },
    signOff: 
    {
      name: "",
      signature: "",
      role: ""
    },
    isSignedOff: false,
  }
}

export class Meeting extends React.Component<IMeetingProps, IMeetingState> {
  public static contextType = ServiceContext;
  private readonly getMeeting: IGetMeetingUseCase;

  public constructor(props: IMeetingProps, context: IServiceProvider) {
    super(props);

    this.getMeeting = context.get<IGetMeetingUseCase>("IGetMeetingUseCase");

    this.state = emptyState;
  }

  async componentDidMount(){
    if(!this.props.location){
      this.setState({errorMessage: "An error occurred."})
      return;
    }

    let loadExistingMeeting : boolean = false;
    if(this.props.location.search){
      const queries = queryString.parse(this.props.location.search, {parseBooleans: true});
      loadExistingMeeting = queries.existingMeeting as boolean;
    }

    if(!loadExistingMeeting){
      this.handleNewMeeting();
      return;
    }

    const existingMeeting = await this.getMeeting.Execute();
    if(existingMeeting){
      const signOffEditable = !existingMeeting.isSignedOff;
      this.setState({meeting: existingMeeting, shouldDisplay: true, signOffEditable: signOffEditable, signOffMode: true})
      return;
    }

    this.setState({errorMessage: "Meeting could not be loaded."});
  }

  private handleNewMeeting(){
    if(!this.props.location.state || !this.props.location.state.selectedTra){
      this.setState({errorMessage: "No TRA was selected."})
      return;
    }

    const existingMeeting = this.props.location.state.meeting;
    if(existingMeeting){
      this.setState({meeting: existingMeeting, shouldDisplay: true, signOffEditable: true, detailsEditable: true})
      return;
    }
    
    let meeting = this.state.meeting;
    meeting.meetingName = this.buildMeetingName(this.props.location.state.selectedTra.tra.name, new Date());
    this.setState({shouldDisplay: true, signOffEditable: true, detailsEditable: true});
  }

  buildMeetingName = (traName: string, date: Date): string => {
    return `${traName} meeting ${date.toLocaleDateString('en-GB')}`;
  }

  onSaveComplete = (): void => {
    this.setState({ detailsEditable: false, signOffEditable: false })
  }

  onChangeAttendees = (newAttendees: IAttendees): void => {
    let meeting = this.state.meeting;
    meeting.meetingAttendance = newAttendees;
    this.setState({meeting:meeting})
  }

  onChangeIssues = (newIssues: Array<IIssue>): void => {
    let meeting = this.state.meeting;
    meeting.issues = newIssues;
    this.setState({meeting:meeting})
  }

  render() {
    if(!this.state.shouldDisplay){
      return this.state.errorMessage ? this.renderErrorScreen() : this.renderSpinner();
    }

    const meeting = this.state.meeting;
    const selectedTra = this.props.location.state.selectedTra;
    return (
      <div>
        {this.renderBackArrow()}
        <h1 className="tra-name-etra-meet">{meeting.meetingName}</h1>
        <Attendees attendees={meeting.meetingAttendance} onChangeAttendees={this.onChangeAttendees} readOnly={!this.state.detailsEditable}/>
        <div className="record-issues-padding">
          <RecordIssues blocks={selectedTra.tra.blocks} readOnly={!this.state.detailsEditable} onChangeIssues={this.onChangeIssues} issues={meeting.issues}/>
        </div>
        <ReviewMeeting
          traId={selectedTra.tra.id}
          meetingId={meeting.id}
          meetingName={meeting.meetingName}
          attendees={meeting.meetingAttendance}
          issues={meeting.issues}
          onSaveComplete={this.onSaveComplete}
          signOffMode ={this.state.signOffMode}
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
          <p>{this.state.errorMessage}</p>
          <p>
            Please return to the &nbsp;
            <Link to="">landing page.</Link>
          </p>
        </div>
      </div>
    );
  };

  private renderSpinner() {
    return (
      <div className="spinner-wrapper">
       <div className="loading-spinner"><div></div><div></div><div></div></div>
      </div>
    );
  }
}

export default Meeting;