import React from 'react';
import './index.css';
import { IIssue } from '../../../Domain/Issues'
import { IServiceProvider, ServiceContext } from '../../../ServiceContext';
import { ISaveMeetingDraftUseCase } from '../../../Boundary/SaveMeetingDraft';
import { MeetingModel, IMeetingModel, IMeetingSignOffModel, MeetingSignOffModel } from '../../../Domain/Meeting';
import { IAttendees } from '../../../Domain/Attendees';
import { ISignOff } from '../../../Domain/SignOff';
import { Redirect, Link } from 'react-router-dom';
import Attendees from '../../Attendees';
import RecordIssues from '../../RecordIssues';
import { ISignOffMeetingUseCase } from '../../../Boundary/SignOffMeeting';
import { ICreateMeetingUseCase } from '../../../Boundary/CreateMeeting';
import { ITraInfo } from '../../../Boundary/TRAInfo';
import getEnvVariable from '../../../Utilities/environmentVariables';

const workTrayUrl = getEnvVariable("WORK_TRAY_URL")

export interface ISaveMeetingProps {
  signOffMode: boolean,
  traId: number,
  meetingId?: string,
  meetingName: string,
  attendees: IAttendees,
  issues: Array<IIssue>,
  signOff: ISignOff,
  isSessionLive?:boolean,
  selectedTra: ITraInfo
}

export interface ISaveMeetingState {
  isAttemptingToSave: boolean;
  isValid: boolean;
  redirectToLandingPage: boolean;
  meetingSaved: boolean;
}

export class SignatureSignOff extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  public static contextType = ServiceContext;
  private readonly signoffMeeting: ISignOffMeetingUseCase;
  private readonly createMeeting: ICreateMeetingUseCase;

  public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.signoffMeeting = context.get<ISignOffMeetingUseCase>("ISignOffMeetingUseCase");
    this.createMeeting = context.get<ICreateMeetingUseCase>("ICreateMeetingUseCase");
    
    this.state = {
      isAttemptingToSave: false,
      isValid: this.checkIsValid(this.props),
      meetingSaved: false,
      redirectToLandingPage: false
    }
  }
 
  componentWillReceiveProps(newProps: ISaveMeetingProps){
    this.setState({isValid: this.checkIsValid(newProps)})
   
  }

  private checkIsValid(props: ISaveMeetingProps){
    if(isNaN(props.attendees.attendees) || props.attendees.attendees < 1){
      return false;
    }
    
    return true;
  }

  getMeetingModel = () : IMeetingModel => {
    return new MeetingModel(
      this.props.traId,
      this.props.meetingName,
      this.props.issues, 
      this.props.attendees, 
      this.props.signOff,
      this.props.meetingId, 
    );
  }

  getMeetingModelWithSignatureTrimmed = (): IMeetingModel => {
    const trimmedSignatureSignoff:ISignOff = {
      signature:this.props.signOff.signature.slice(22) ,
      name: this.props.signOff.name,
      role: this.props.signOff.role
    }
    return new MeetingModel(
      this.props.traId,
      this.props.meetingName,
      this.props.issues, 
      this.props.attendees, 
      trimmedSignatureSignoff,
      this.props.meetingId, 
    )
  }

  getMeetingSignOffModel = () : IMeetingSignOffModel => {
    return new MeetingSignOffModel(
      this.props.meetingId!,
      this.props.signOff
    );
  }

  handleSaveMeeting = async () => {
    let successful;
    this.setState({ isAttemptingToSave: true });
    
    successful = await this.createMeeting.Execute(this.getMeetingModelWithSignatureTrimmed());
    /*if(this.props.signOffMode){
      successful = await this.signoffMeeting.Execute(this.getMeetingSignOffModel());
    }else{
      successful = await this.createMeeting.Execute(this.getMeetingModelWithSignatureTrimmed());
    }*/
    if (!successful) {
      this.setState({ isAttemptingToSave: false });
    }
    else{
      this.setState({meetingSaved: true})
    }
  }

  render() {
    /*if(this.state.redirectToLandingPage){
      return <Redirect to={{
        pathname: "/etra/saved/",
        state: { meetingname: this.props.meetingName }
      }} />
    }*/

    if(this.state.isAttemptingToSave){
      return this.renderSpinner();
    }

    if(!this.state.meetingSaved){
      return this.renderSaveMeetingButtons();
    }
    //Meeting is saved
    return this.renderSignoffConfirmation();
  }
  
  private renderSaveMeetingButtons() {
    return (
      <div style={{marginTop: "40px"}}>
             <button className="govuk-button  lbh-button" data-module="govuk-button"
          id="save-meeting"
          onClick={this.handleSaveMeeting}
          disabled={!this.state.isValid  || !this.props.isSessionLive 
        }>Save meeting and email to TRA</button>
        <span style={{display: "inline", marginLeft: "50px"}} >
            <Link to={{
                        pathname: "/etra/meeting/",
                        state: {
                            meeting: this.getMeetingModel(),
                            selectedTra: this.props.selectedTra
                        }
                    }}
              id="lnkBack" href="#">Cancel to edit actions</Link>
            </span>
      </div>
    );
  }

  private renderSpinner() {
    return (
      <div className="spinner-wrapper">
       <div className="loading-spinner"><div></div><div></div><div></div></div>
      </div>
    );
  }

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
}

export default SignatureSignOff;