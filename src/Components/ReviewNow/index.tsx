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
                  
                </div>
            );   
        }

    }
  }

  export default ReviewNow;