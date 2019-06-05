import React from 'react';
import { IIssue } from '../Issues';
import './index.css';
import ReviewNow from '../ReviewNow';

  export interface IMeetingProps{
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
      issues: Array<IIssue>(),
      isReviewingNow:false,
      isAttemptingToSave:false
    };

    handleReviewNow(){
      this.setState({isReviewingNow:true});
    }
  
    render() {
      return (
        <div>

          <div>
            <ReviewNow 
              isReviewingNow={this.state.isReviewingNow} 
              isAttemptingToSave={this.state.isAttemptingToSave} 
              handleIsReviewingNow={this.handleReviewNow} 
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