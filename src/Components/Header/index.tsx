import React, {Component} from 'react';
import './index.css';


export default class Header extends Component {
  public render(){
    return(
      <div className="header">
        <div className="background-black">
          <div className="logo-container">
            <img src={require('../../Images/hackneyLogo.png')} alt="logo" width="206px" height="37px"></img>
          </div>
        </div>
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
