import React from 'react';
import './index.css';
import Confirmation from '../Confirmation Page'
import {IIssue} from '../Issues'
import {SaveMeetingUseCase, ISaveMeetingUseCase, SaveMeetingInputModel } from '../../UseCases/SaveMeeting'

  export interface ISaveMeetingProps{
    isAttemptingToSave:boolean,
    isSaveConfirmed:boolean,
    issues:Array<IIssue>,
  }

  export interface ISaveMeetingState{
    isAttemptingToSave:boolean,
    isSaveConfirmed:boolean,
    issues:Array<IIssue>,
  }

  export class SaveMeeting extends React.Component<ISaveMeetingProps, ISaveMeetingState> {
    public constructor(props:ISaveMeetingProps){
      super(props);
      this.state = {
        isAttemptingToSave : props.isAttemptingToSave,
        isSaveConfirmed:props.isSaveConfirmed,
        issues:props.issues,
      }
    }

    public static defaultProps: Partial<ISaveMeetingProps> = {
      isAttemptingToSave:false,
      isSaveConfirmed:false,
      issues: new Array<IIssue>(),
    };

    handleSaveMeeting(){
      this.setState({isAttemptingToSave:true});
      let saveMeetingUseCase = new SaveMeetingUseCase();
      let outputModel = saveMeetingUseCase.Execute(new SaveMeetingInputModel(this.state.issues));
      this.setState({isAttemptingToSave:false, isSaveConfirmed : outputModel.successful});
    }

    render() {
        if(this.state.isSaveConfirmed)
        {
          return this.renderShowConfirmation(); 
        }
        else if(!this.state.isAttemptingToSave){
          return this.renderSaveMeeting();
        }
        else if(this.state.isAttemptingToSave){
          return this.renderAttemptingToSaveMeeting();
        }
    }

    private renderSaveMeeting(){
      return (
        <div>
          <div><button id="save-meeting" className="button" onClick={this.handleSaveMeeting.bind(this)} >Save and email issue list to TRA</button></div>
        </div>
      ); 
    }

    private renderAttemptingToSaveMeeting(){
      return (
        <div className="spinner">
          SPINNER
        </div>
      ); 
    }

    private renderShowConfirmation(){
      return (
        <div>
          <Confirmation  />
        </div>
      ); 
    }
  }
  
  export default SaveMeeting;