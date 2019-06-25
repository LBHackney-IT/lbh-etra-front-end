import React from 'react';
import './index.css';

export interface IRepNameProp{
  onUpdated: (repName:string) => void
}

export interface IRepNameState{
  representativeName:string
}

export default class RepName extends React.Component<IRepNameProp, IRepNameState> {
public constructor(props:IRepNameProp){
  super(props);
  this.state = {
    representativeName:""
  }
}
handleRepConfirmation = (event: React.ChangeEvent<HTMLInputElement>):void =>{
  let repName = event.target.value;
  this.setState({representativeName:repName})
  this.props.onUpdated(repName)
}

  render() {
    return (
      <div>
        <div className="confirmation-title" >Your Name and confirmation </div>
        <div className="confirmation-input">I <input onChange={this.handleRepConfirmation} className="representative-name" placeholder="[Name]" value={this.state.representativeName}/>do hereby confirm that I have reviewed these issues.</div>
      </div>
    );
  }
}