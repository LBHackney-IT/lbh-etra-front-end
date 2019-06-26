import React from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';
import { string } from 'prop-types';

export interface IConfirmationProps {
  SignatureImage: string,
  role:string
  repName:string
}

export interface IConfirmationState {
  issues: Array<IIssue>
}

export class Confirmation extends React.Component<IConfirmationProps, IConfirmationState> {

  jsonIssueResponse = []

  public constructor(props: IConfirmationProps) {
    super(props);

    this.state = { 
      issues: this.jsonIssueResponse,
     }
  }

  public static defaultProps: Partial<IConfirmationProps> = {
    SignatureImage: ""
  };


  public state: IConfirmationState = {
    issues: Array<IIssue>(),
  };

  render() {
    return (
      <div>
        <div className="confirmation-input">
          I {this.props.repName} do hereby confirm that I have reviewed these issues.
        </div>
        <div >
          <div className="signature-header">Signature of TRA representative</div>
          <div>
            <img id="signature-image" src={this.props.SignatureImage} alt="signature" />
          </div>
          <div className="tra-chair-header">{this.props.role}</div>
        </div>
        <div className="message-box">
          <div className="text-container">
            <div data-test="message-one" id="review-later-one" className="message-text message-one">Any issues have been saved and emailed to the TRA representative.</div>
          <div data-test="message-two" id="review-later-two" className="message-text">You can access the issues from <a href="#">your work tray.</a></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirmation;