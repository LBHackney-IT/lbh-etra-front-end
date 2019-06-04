import React from 'react';
import './index.css';
import SaveMeeting from '../SaveMeeting';

  export interface IReviewNowProps{
    isReviewingNow:boolean,
    isAttemptingToSave: boolean,
    handleIsReviewingNow():void

  }

  export interface IReviewNowState{
    isReviewingNow:boolean,
    isAttemptingToSave: boolean
  }

  export class ReviewNow extends React.Component<IReviewNowProps, IReviewNowState> {

    public constructor(props:IReviewNowProps){
      super(props);
    }

    public static defaultProps: Partial<IReviewNowProps> = {
      isReviewingNow:false
    };

    public state: IReviewNowState = {
        isReviewingNow : false,
        isAttemptingToSave: false
    };



    render() {
        if(this.state.isReviewingNow === false){
            return this.isNotReviewingNow();  
        }
        else{
            return this.isReviewingNow();
        }
    }

    private isNotReviewingNow(){
        return (
            
            <div>
                <div className="ready-for-review-by">Ready for review by TRA representative?</div>
                <button className="button" id="review-now" onClick={this.props.handleIsReviewingNow.bind(this)}>Review now with TRA</button>
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

                <div><SaveMeeting isAttemptingToSave={this.state.isAttemptingToSave} /></div>
            </div>
        ); 
    }
  }

  export default ReviewNow;