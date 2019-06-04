import React from 'react';
import './index.css';
import Confirmation from '../Confirmation Page'

  export interface ISaveMeetingProps{
    isAttemptingToSave:boolean,
    isSaveConfirmed:boolean
  }

  export interface ISaveMeetingState{
    isAttemptingToSave:boolean,
    isSaveConfirmed:boolean
  }

  export class SaveMeeting extends React.Component<ISaveMeetingProps, ISaveMeetingState> {

    public constructor(props:ISaveMeetingProps){
      super(props);
    }

    public static defaultProps: Partial<ISaveMeetingProps> = {
      isAttemptingToSave:false
    };

    public state: ISaveMeetingState = {
      isAttemptingToSave : false,
      isSaveConfirmed:false
    };

    handleSaveMeeting(){
        this.setState({isAttemptingToSave:true});
    }

    render() {
        if(this.state.isAttemptingToSave === false){
          return this.renderSaveMeeting();
        }
        else if(this.state.isSaveConfirmed)
        {
          return this.renderShowConfirmation(); 
        }
    }

    private renderSaveMeeting(){
      return (
        <div>
          <div><button id="save-meeting" className="button" onClick={this.handleSaveMeeting.bind(this)} >Save and email issue list to TRA</button></div>
        </div>
      ); 
    }

    private renderShowConfirmation(){
      return (
        <div>
          <Confirmation />
        </div>
      ); 
    }
  }
  
  export default SaveMeeting;