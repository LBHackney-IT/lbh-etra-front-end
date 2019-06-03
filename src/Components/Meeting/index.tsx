import React from 'react';
import { IIssue } from '../Issues';
import './index.css';

  export interface IMeetingProps{

  }

  export interface IMeetingState{
    issues: Array<IIssue>,
  }

  export class Meeting extends React.Component<IMeetingProps, IMeetingState> {

    public constructor(props:IMeetingProps){
      super(props);
    }

    public static defaultProps: Partial<IMeetingProps> = {
      
    };

    public state: IMeetingState = {
      issues: Array<IIssue>()
    };

    reviewNow(){
      
    }
  
    render() {
      return (
        <div>

          <div className="ready-for-review-by">
            Ready for review by TRA representative?
          </div>
          <div>
            <button className="button" id="review-now" onClick={this.reviewNow}>Review now with TRA</button>
          </div>
          <div>
            <button className="button" id="review-later">TRA representative to review later</button>
          </div>
            <input type="submit" id="submit-button" value="Save meeting" />
        </div>
      );
    }
  }

  export default Meeting;