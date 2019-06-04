import React from 'react';
import { IIssue } from '../Issues';
import './index.css';
import ReviewNow from '../ReviewNow';

  export interface IMeetingProps{
    issues: Array<IIssue>,
    isReviewingNow:boolean,
    isAttemptingToSave:false
  }

  export interface IMeetingState{
    issues: Array<IIssue>,
    isReviewingNow:boolean,
    isAttemptingToSave:false
  }

  export class Meeting extends React.Component<IMeetingProps, IMeetingState> {

    public constructor(props:IMeetingProps){
      super(props);
    }

    public static defaultProps: Partial<IMeetingProps> = {
      issues: Array<IIssue>(),
      isReviewingNow:false,
      isAttemptingToSave:false
    };

    public state: IMeetingState = {
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
            <ReviewNow isReviewingNow={this.state.isReviewingNow} isAttemptingToSave={this.state.isAttemptingToSave} handleIsReviewingNow={this.handleReviewNow} />
          </div>
          <div>
            <button className="button" id="review-later">TRA representative to review later</button>
          </div>
            
        </div>
      );
    }
  }

  export default Meeting;