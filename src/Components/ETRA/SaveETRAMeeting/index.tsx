import React from 'react';
import './index.css';
import { IIssue } from '../../../Domain/Issues'
import { IServiceProvider, ServiceContext } from '../../../ServiceContext';
import { ISaveMeetingDraftUseCase } from '../../../Boundary/SaveMeetingDraft';
import { MeetingModel, IMeetingModel } from '../../../Domain/Meeting';
import { IAttendees } from '../../../Domain/Attendees';
import { ISignOff } from '../../../Domain/SignOff';
import { Redirect, Link } from 'react-router-dom';
import { ITraInfo } from '../../../Boundary/TRAInfo';
import Attendees from '../../Attendees';
import RecordIssues from '../../RecordIssues';
export interface ISaveMeetingProps {
  signOffMode: boolean,
  traId: number,
  meetingId?: string,
  meetingName: string,
  attendees: IAttendees,
  issues: Array<IIssue>,
  signOff: ISignOff,
  isSessionLive?:boolean,
  renderSignOffLinks?: boolean,
  selectedTra?: ITraInfo;
}

export interface ISaveMeetingState {
  isAttemptingToSave: boolean;
  isValid: boolean;
  redirectToLandingPage: boolean;
 
}

export class SaveETRAMeeting extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
  public static contextType = ServiceContext;
  private readonly saveMeetingDraft: ISaveMeetingDraftUseCase;
  public constructor(props: ISaveMeetingProps, context: IServiceProvider) {
    super(props, context);
    this.saveMeetingDraft = context.get<ISaveMeetingDraftUseCase>("ISaveMeetingUseCase");
    
    this.state = {
      isAttemptingToSave: false,
      isValid: this.checkIsValid(this.props),
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

  handleSaveDraft = () => {
    this.setState({ isAttemptingToSave: true });
    const successful = this.saveMeetingDraft.Execute(this.getMeetingModel());

    if (successful) {
      this.setState({ redirectToLandingPage: true });
    }
    else {
      this.setState({ isAttemptingToSave: false });
    }
  }

  //Save draft in case user attempts to leave signoff page before saving
  handleSaveDraftLink = () => {
    this.setState({ isAttemptingToSave: true });
    const successful = this.saveMeetingDraft.Execute(this.getMeetingModel());

    if (!successful) {
      this.setState({ isAttemptingToSave: false });
    }
  }

  render() {
    if(this.state.redirectToLandingPage){
      return <Redirect to={{
        pathname: "/etra/saved/",
        state: { meetingname: this.props.meetingName }
      }} />
    }

    if(this.state.isAttemptingToSave){
      return this.renderSpinner();
    }

    return this.renderSaveMeetingButtons();
  }
  
  private renderSaveMeetingButtons() {
    return (
      <div>
         <div>
              <div className="heading">End of meeting</div>
                  <p>At the end of the meeting, please save the meeting. You will then be able to proceed with signing 
                      off the actions from the meeting with the TRA representative now or later</p>
          </div>
        <button 
          id="save-draft" style={{width: "170px"}}
          className="button btn-primary btn-stacked button-margin" 
          onClick={this.handleSaveDraft}
          disabled={!this.state.isValid}>
            Save meeting
        </button>
          <div className="record-issues-padding">
            {this.props.renderSignOffLinks ? this.renderSignOffMeetingOptions(): ""}
        </div>
      </div>
    );
  }

  renderSignOffMeetingOptions() {
    return (
      <>
         <div className="heading">TRA representative is present</div>
         <div>
           <p>If a TRA representative is present, review the actions with them. You can then sign off the meeting.
            </p>
            <p>
            <Link onClick={this.handleSaveDraftLink} to={{
              pathname: "/etra/signoff/",
              state: {
                meeting: this.getMeetingModel(),
                selectedTra: this.props.selectedTra,
                    traEmailSignOff: false
                }
              }}
            id="signoffsignature" href="#">Sign off agreed meeting now</Link>
            </p>
            <div className="heading" style={{paddingTop: "37px"}}>TRA representative is not present</div>
            <p>If a TRA representative is not present to sign off the meeting, please make sure you have agreed the actions with the TRA 
              representative before emailing them for the sign off.
            </p>
            <p>
            <Link onClick={this.handleSaveDraftLink} to={{
              pathname: "/etra/signoff/",
              state: {
                  meeting: this.getMeetingModel(),
                  selectedTra: this.props.selectedTra,
                  traEmailSignOff: true
              }
          }}
          id="signoffemail" href="#">Confirm agreed actions for sign off later</Link>
            </p>
          </div>
      </>
    );
  }

  private renderSpinner() {
    return (
      <div className="spinner-wrapper">
       <div className="loading-spinner"><div></div><div></div><div></div></div>
      </div>
    );
  }
}

export default SaveETRAMeeting;