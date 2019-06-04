import React from 'react';
import './index.css';

  export interface IReviewNowProps{
    isReviewingNow:boolean,
  }

  export interface IReviewNowState{
    isReviewingNow:boolean,
  }

  export class ReviewNow extends React.Component<IReviewNowProps, IReviewNowState> {

    public constructor(props:IReviewNowProps){
      super(props);
    }

    public static defaultProps: Partial<IReviewNowProps> = {
      isReviewingNow:false
    };

    public state: IReviewNowState = {
        isReviewingNow : false
    };

    handleReviewNow(){
        this.setState({isReviewingNow:true});
    }

    render() {
        if(this.state.isReviewingNow === false){
            return (
                <div>
                  <button className="button" id="review-now" onClick={this.handleReviewNow.bind(this)}>Review now with TRA</button>
                </div>
            );   
        }
        else{
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

                  <div><input id="save-meeting" className="button" type="submit" value="Save meeting" /></div>
                </div>
            );   
        }

    }
  }

  export default ReviewNow;