import React from 'react';
import './index.css';
import SaveMeeting from '../SaveMeeting';
import {IIssue} from '../Issues'

  export interface IReviewNowProps{
    isReviewingNow:boolean,
    isAttemptingToSave: boolean,
    issues:Array<IIssue>,
  }

  export interface IReviewNowState{
    isReviewingNow:boolean,
    isAttemptingToSave: boolean,
    issues:Array<IIssue>
  }

  export class ReviewNow extends React.Component<IReviewNowProps, IReviewNowState> {

    public constructor(props:IReviewNowProps){
      super(props);
      this.state={
        isReviewingNow : props.isReviewingNow,
        isAttemptingToSave: props.isAttemptingToSave,
        issues:props.issues
      }
    }

    public static defaultProps: Partial<IReviewNowProps> = {
        isReviewingNow:false,
        isAttemptingToSave: false,
        issues:Array<IIssue>()
    };

    handleIsReviewingNow = () => {
        this.setState({isReviewingNow:true});
    }

    render() {
        if(this.state.isReviewingNow)
        {
            return this.isReviewingNow();
        }
        else
        {
            return this.isNotReviewingNow();
        }
    }

    private isNotReviewingNow(){
        return (
            <div>
                <div className="ready-for-review-by">Ready for review by TRA representative?</div>
                <button className="button" id="review-now" onClick={this.handleIsReviewingNow}>Review now with TRA</button>
            </div>
        ); 
    }

    private isReviewingNow() {
        return (
            <div>
                <div className="signature-of-TRA-rep">Signature of TRA representative</div>
                <div>
                    <input type="textbox" />
                </div>
                <div className="role-of-TRA-representative">Role of TRA representative</div>

                <div><input id="chair" className="radio-unselected" type="radio" name="tra-role" value="Chair"></input><span className="radio-text">Chair</span></div>
                <div><input id="vice-chair" className="radio-unselected" type="radio" name="tra-role" value="Vice Chair"></input><span className="radio-text">Vice Chair</span></div>
                <div><input id="secretary" className="radio-unselected" type="radio" name="tra-role" value="Secretary"></input><span className="radio-text">Secretary</span></div>
                <div><input id="treasurer" className="radio-unselected" type="radio" name="tra-role" value="Treasurer"></input><span className="radio-text">Treasurer</span></div>

                <div><SaveMeeting isAttemptingToSave={this.state.isAttemptingToSave} issues={this.state.issues} /></div>
            </div>
        ); 
    }
  }

  export default ReviewNow;