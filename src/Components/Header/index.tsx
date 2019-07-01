import React, {Component} from 'react';
import './index.css';

export default class Header extends Component {
  public render(){
    return(
      <div className="header">
        <div className="background-black"><img src="/Users/maysakanoni/Hackney/ManageATeneancy/lbh-etra-front-end/src/HackneyLogo.svg" alt="logo"></img></div>
        <div className="background-white"></div>
        <div className="background-top-green"></div>
        <div className="divider"></div>
        <div className="background-middle-green"></div>
        <div className="divider"></div>
        <div className="background-bottom-green"></div>
      </div>
    );
  }

}