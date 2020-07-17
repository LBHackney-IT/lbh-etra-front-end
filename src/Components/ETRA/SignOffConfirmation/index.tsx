import React from 'react';
import { IIssue } from '../../../Domain/Issues';
import './index.css';
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
import getEnvVariable from '../../../Utilities/environmentVariables';

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

const workTrayUrl = getEnvVariable("WORK_TRAY_URL")

export class SignOffConfirmation extends React.Component<IMeetingProps, IMeetingState> {
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
    /*const availableToken = await this.getToken.Execute();
    if(availableToken)
    {
       this.setState({isSessionLive:true});
    }*/
    
    let loadExistingMeeting : boolean = false;
    let requestFromWorkTray: boolean=false;
    if(this.props.location.search){
      const queries = queryString.parse(this.props.location.search, {parseBooleans: true});
      loadExistingMeeting = queries.existingMeeting as boolean;   
      requestFromWorkTray=queries.isRequestFromWorkTray as boolean;
      this.isAnExistingMeeting=loadExistingMeeting;
    }
    /*if(!loadExistingMeeting){
      this.handleNewMeeting();
      return;
    }*/
    
  }

  private handleNewMeeting(){
   /* if(!this.props.location.state || !this.props.location.state.selectedTra){
      this.setState({errorMessage: "No TRA was selected."})
      return;
    }

    //Meeting loaded from browser local storage
    const existingMeeting = this.props.location.state.meeting;
    if(existingMeeting){
      this.setState({meeting: existingMeeting, shouldDisplay: true, signOffIncomplete: true, detailsEditable: false})
      return;
    }*/
    
    let meeting = this.state.meeting;
    meeting.meetingName = this.buildMeetingName(this.props.location.state.selectedTra.tra.name, new Date());
    this.setState({shouldDisplay: true, signOffIncomplete: true, detailsEditable: false});
  }

  buildMeetingName = (traName: string, date: Date): string => {
    return `${traName} meeting ${date.toLocaleDateString('en-GB')}`;
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
        <MeetingAttendees isComplete={!this.state.signOffIncomplete} attendees={meeting.meetingAttendance} onChangeAttendees={() => void 0} readOnly={true}/>
        <div className="record-issues-padding">
          <RecordActions blocks={selectedTra && selectedTra.blocks} readOnly={true} onChangeIssues={() => void 0} issues={meeting.issues}/>
        </div>
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

  private renderSignoffConfirmation(){
    return (
      <div>
        <section className="lbh-etra-announcement">
          <label data-test="issue-label" className="label">
            The meeting has been emailed to the TRA representative for sign off.</label>
          <div style={{paddingTop: "1.25rem"}}>
          <label data-test="issue-label" className="label">
            You can access the actions from <a href={workTrayUrl}>your work tray</a>.</label>
            </div>
        </section>
    </div>
    )
  }

  private renderSpinner() {
    return (
      <div className="spinner-wrapper">
       <div className="loading-spinner"><div></div><div></div><div></div></div>
      </div>
    );
  }
}
export default SignOffConfirmation;
