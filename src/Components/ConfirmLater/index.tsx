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
        <div className="confirmation-title" >Your Name and confirmation </div>
        <div className="confirmation-text">I <input onChange={this.handleRepConfirmation} className="representative-name" placeholder="[Name]" value={this.state.representativeName}/>do hereby confirm that I have reviewed these issues.</div>
      </div>
    );
  }
}