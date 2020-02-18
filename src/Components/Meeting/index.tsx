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
import { IGetTokenUseCase } from "../../Boundary/GetTokensForCurrentSession";
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
  signOffIncomplete: boolean,
  errorMessage: string,
  signOffMode: boolean,
  meeting: IMeetingModel,
  isSessionLive:boolean
}

const emptyState : IMeetingState = {
  shouldDisplay: false,
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

export class Meeting extends React.Component<IMeetingProps, IMeetingState> {
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
   
    const existingMeeting = await this.getMeeting.Execute();
    
    if(existingMeeting){
      const signOffEditable = !existingMeeting.isSignedOff;
      this.setState({meeting: existingMeeting, shouldDisplay: true, signOffIncomplete: signOffEditable, signOffMode: (!requestFromWorkTray || signOffEditable)})
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
    if(!this.state.shouldDisplay){
      return this.state.errorMessage ? this.renderErrorScreen() : this.renderSpinner();
    }


    const meeting = this.state.meeting;
    const selectedTra = this.props.location.state && this.props.location.state.selectedTra.tra;
   

    return (
      <div>
         {this.renderBackArrow()}
        <h1 className="tra-name-etra-meet">{meeting.meetingName}</h1>
        <Attendees isComplete={!this.state.signOffIncomplete} attendees={meeting.meetingAttendance} onChangeAttendees={this.onChangeAttendees} readOnly={!this.state.detailsEditable}/>
        <div className="record-issues-padding">
          <RecordIssues blocks={selectedTra && selectedTra.blocks} readOnly={!this.state.detailsEditable} onChangeIssues={this.onChangeIssues} issues={meeting.issues}/>
        </div>
        <div>
          <div className="heading">Saving and signing off the ETRA meeting</div>
          <p>The ETRA meeting needs to synchronise with Manage a tenancy. You need to be online and signed into Manage a tenancy 
            for this to happen. Do not close your web browser or switch off your iPad until you have done this.</p>
          <p>If you are offline or not signed into Manage a tenancy you can only ‘Save the issues for review with the TRA later’. The TRA 
            representative’s signature, name and role will not be saved at this stage. Once you are back online and signed in, you will be 
            able to ‘Email issues to the TRA for sign off’. To do this you need sign in to Manage a tenancy and navigate to the ETRA meetings 
            page and click on the link: ‘Draft ETRA meetings for review’. You should then see a link to the meeting on the next page..</p>
          <p>If at the meeting you are online, sign into Manage a tenancy and then the TRA representative can sign, add 
          their name and role and you can ‘Save the signed off issue list and email to TRA’.</p>
        </div>
        <ReviewMeeting
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
        />
      </div>);
  }

  renderBackArrow(){
    if(!this.isAnExistingMeeting)
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