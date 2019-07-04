import React from 'react';
import './index.css';

export interface IConfirmLaterProp{
}

export interface IConfirmLaterState{
  representativeName:string
}

export default class ConfirmLater extends React.Component<IConfirmLaterProp, IConfirmLaterState> {
public constructor(props:IConfirmLaterProp){
  super(props);
  this.state = {
    representativeName:""
  }
}

handleRepConfirmation = (event: React.ChangeEvent<HTMLInputElement>):void =>{
  let repName = event.target.value;
  this.setState({representativeName:repName})
}

render() {
  return (
    <div>
      <div data-test="message-one" id="review-later-one" className="message-text message-one">Any issues have been saved and emailed to the TRA representative.</div>
          <div data-test="message-two" id="review-later-two" className="message-text">You can access the issues from <a href="#">your work tray.</a></div>
    </div>
  );
}
}