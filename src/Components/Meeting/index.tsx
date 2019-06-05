import React from 'react';
import { IIssue } from '../Issues';
import './index.css';
import ReviewNow from '../ReviewNow';

  export interface IMeetingProps {
    traName: string,
    dateOfMeeting: Date,
    issues: Array<IIssue>,
    isReviewingNow:boolean,
    isAttemptingToSave:boolean
  }

  export interface IMeetingState{
    issues: Array<IIssue>,
    isReviewingNow:boolean,
    isAttemptingToSave:boolean
  }

  export class Meeting extends React.Component<IMeetingProps, IMeetingState> {

    public constructor(props:IMeetingProps){
      super(props);
      this.state ={
        issues: props.issues,
        isReviewingNow:props.isReviewingNow,
        isAttemptingToSave:props.isAttemptingToSave
      }
    }

    public static defaultProps: Partial<IMeetingProps> = {
      dateOfMeeting: new Date(),
      issues: Array<IIssue>(),
      isReviewingNow:false,
      isAttemptingToSave:false
    };

    handleReviewNow(){
      this.setState({isReviewingNow:true});
    }

    getMeetingDateString = () : string => {
      const date = this.props.dateOfMeeting;
      return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
      //return this.props.dateOfMeeting.toLocaleDateString("en-GB");
    }
  
    render() {
      return (
        <div>
          <h1>{this.props.traName} ETRA meeting {this.getMeetingDateString()}</h1>
          <div>
            <ReviewNow 
              isReviewingNow={this.state.isReviewingNow} 
              isAttemptingToSave={this.state.isAttemptingToSave} 
              issues={this.state.issues}
              />
          </div>
          <div>
            <button className="button" id="review-later">TRA representative to review later</button>
          </div>
            
        </div>
      );
    }
  }

  export default Meeting;