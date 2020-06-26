import React from 'react';
import { IIssue } from '../../../Domain/Issues';
import './index.css';
import ReviewETRAMeeting from '../ReviewETRAMeeting';
import RecordActions from '../RecordActions'
import MeetingAttendees from '../MeetingAttendees';
import { Location } from 'history';
import { Link } from 'react-router-dom';
import { IAttendees } from '../../../Domain/Attendees';
import { ITraInfo } from '../../../Boundary/TRAInfo';
import { IMeetingModel } from '../../../Domain/Meeting';
import queryString from 'query-string';
import { IServiceProvider, ServiceContext } from '../../../ServiceContext';
import { IGetMeetingUseCase } from '../../../Boundary/GetMeeting';
import { IGetTokenUseCase } from "../../../Boundary/GetTokensForCurrentSession";
export interface IMeetingRedirectProps {
  selectedTra: ITraInfo;
  meeting?: IMeetingModel;
  traEmailSignOff?: boolean;
}

export interface IMeetingProps {
  location: Location<IMeetingRedirectProps>
}

export interface IMeetingState {
  shouldDisplay: boolean,
  apiError: boolean,
  detailsEditable: boolean,
  signOffIncomplete: boolean,
  errorMessage: string,
  signOffMode: boolean,
  meeting: IMeetingModel,
  isSessionLive:boolean
}

const emptyState : IMeetingState = {
  shouldDisplay: false,
  apiError: false,
  detailsEditable: false,
  signOffIncomplete: false,
  errorMessage: "",
  signOffMode: false,
  isSessionLive:false,
  meeting: {
    id: "",
    traId: -1,
    meetingName: "",
    issues: [],
    meetingAttendance:
    {
      councillors: "",
      hackneyStaff: "",
      attendees: 0
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

export class SignOffETRAMeeting extends React.Component<IMeetingProps, IMeetingState> {
  public static contextType = ServiceContext;
  private readonly getMeeting: IGetMeetingUseCase;
  private readonly getToken:IGetTokenUseCase;
  private isAnExistingMeeting:boolean=false;

  public constructor(props: IMeetingProps, context: IServiceProvider) {
    super(props);

    this.getMeeting = context.get<IGetMeetingUseCase>("IGetMeetingUseCase");
    this.getToken=context.get<IGetTokenUseCase>("IGetTokenUseCase");
    this.state = emptyState;
  }

  async componentDidMount(){
    if(!this.props.location){ 
      this.setState({errorMessage: "An error occurred."}) 
      return;
    }
    const availableToken = await this.getToken.Execute();
    if(availableToken)
    {
       this.setState({isSessionLive:true});
    }
    
    let loadExistingMeeting : boolean = false;
    let requestFromWorkTray: boolean=false;
    if(this.props.location.search){
      const queries = queryString.parse(this.props.location.search, {parseBooleans: true});
      loadExistingMeeting = queries.existingMeeting as boolean;   
      requestFromWorkTray=queries.isRequestFromWorkTray as boolean;
      this.isAnExistingMeeting=loadExistingMeeting;
    }
    if(!loadExistingMeeting){
      this.handleNewMeeting();
      return;
    }
    
  }

  private handleNewMeeting(){
    if(!this.props.location.state || !this.props.location.state.selectedTra){
      this.setState({errorMessage: "No TRA was selected."})
      return;
    }

    //Meeting loaded from browser local storage
    const existingMeeting = this.props.location.state.meeting;
    if(existingMeeting){
      this.setState({meeting: existingMeeting, shouldDisplay: true, signOffIncomplete: true, detailsEditable: true})
      return;
    }
    
    let meeting = this.state.meeting;
    meeting.meetingName = this.buildMeetingName(this.props.location.state.selectedTra.tra.name, new Date());
    this.setState({shouldDisplay: true, signOffIncomplete: true, detailsEditable: true});
  }

  buildMeetingName = (traName: string, date: Date): string => {
    return `${traName} meeting ${date.toLocaleDateString('en-GB')}`;
  }

  onSaveComplete = (): void => {
    this.setState({ detailsEditable: false })
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

    if(this.state.apiError){
      return this.renderAPIErrorScreen();
    } 

    if(!this.state.shouldDisplay){
      return this.state.errorMessage ? this.renderErrorScreen() : this.renderSpinner();
    }


    const meeting = this.state.meeting;
    const selectedTra = this.props.location.state && this.props.location.state.selectedTra.tra;
   

    return (
      <div>
         {this.renderBackArrow()}
        <h1 className="tra-name-etra-meet">{meeting.meetingName}</h1>
        <MeetingAttendees isComplete={!this.state.signOffIncomplete} attendees={meeting.meetingAttendance} onChangeAttendees={this.onChangeAttendees} readOnly={true}/>
        <div className="record-issues-padding">
          <RecordActions blocks={selectedTra && selectedTra.blocks} readOnly={true} onChangeIssues={this.onChangeIssues} issues={meeting.issues}/>
        </div>
        <ReviewETRAMeeting
          isComplete={!this.state.signOffIncomplete}
          traId={selectedTra && selectedTra.id}
          meetingId={meeting.id}
          meetingName={meeting.meetingName}
          attendees={meeting.meetingAttendance}
          issues={meeting.issues}
          onSaveComplete={this.onSaveComplete}
          signOff={meeting.signOff}
          signOffMode ={this.state.signOffMode}
          isSessionLive={this.state.isSessionLive}
          traEmailSignOff = {this.props.location.state.traEmailSignOff}
          selectedTra={this.props.location.state.selectedTra}
        />
        <div className="record-issues-padding">
        </div>
      </div>);
  }

  renderBackArrow(){
    if(!this.isAnExistingMeeting)
    return (
      <>
        <div className="back-arrow"> &#60;</div>
        <div className="back-link">
          <Link to="/etra/"
          id="lnkBack" href="#">Back</Link>
        </div>
      </>
    );
  };

  renderAPIErrorScreen(){
    return (
      <div>
        {this.renderBackArrow()}
        <div className="api-error">
          <p>Sorry, something seems to have gone wrong.<br />
          We're not sure why this has happened.<br />
          You can try going back to your previous page or to your Home page.<br />
          Please&nbsp; 
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdpefefhPQJ9fSu-fX6-Uvyanppp480ZRUNAe5dQAr8F2dexw/viewform">
            tell us what you were trying to do</a> when this happened so we can fix it.<br />
          </p>
          <p>
           Return to the&nbsp;
            <Link to="">ETRA meetings page.</Link>
          </p>
        </div>
      </div>
    );
  };

  renderErrorScreen(){
    return (
      <div>
        {this.renderBackArrow()}
        <div className="no-meeting-selected">
          <p>{this.state.errorMessage}</p>
          <p className="api-error">Please&nbsp; 
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdpefefhPQJ9fSu-fX6-Uvyanppp480ZRUNAe5dQAr8F2dexw/viewform">
            tell us what you were trying to do</a> when this happened so we can fix it.<br />
          </p>
          <p className="api-error">
            Return to the &nbsp;
            <Link to="">ETRA meetings page.</Link>
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

export default SignOffETRAMeeting;