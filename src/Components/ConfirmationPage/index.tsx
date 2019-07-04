import React from 'react';
import { IIssue } from '../../Domain/Issues';
import './index.css';
import { ISignOff } from '../../Domain/SignOff';

export interface IConfirmationProps {
  signOff: ISignOff,
  reviewedLater: boolean
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

  public state: IConfirmationState = {
    issues: Array<IIssue>(),
  };

  render() {
    return (
      <div>
        <div >
          {this.props.signOff.signature && this.renderSignature()}
          <div className="name-confirmation">{this.props.signOff.name}</div>
          <div className="tra-role">{this.props.signOff.role}</div>
        </div>
        <div className="message-box">
          <div className="text-container">
            <div className="issues-confirmed-header">Issues Confirmed</div>
            {this.props.reviewedLater ? this.renderConfirmedLaterMessage() : this.renderConfirmedNowMessage()}
           </div>
        </div>
      </div>
    );
  }

  private renderConfirmedNowMessage(){
    return (
      <>
       <div data-test="message-one" id="review-later-one" className="message-text message-one">Any issues have been saved and emailed to the TRA representative.</div>
        <div data-test="message-two" id="review-later-two" className="message-text">You can access the issues from <a href="#">your work tray.</a></div>
      </>
    );
  }

  private renderConfirmedLaterMessage(){
    return (
      <>
       <div data-test="message-one" id="review-later-one" className="message-text message-one">Your Housing Officer will now refer any issues raised at the ETRA meeting to the relevant Service Area Officer.</div>
        <div data-test="message-two" id="review-later-two" className="message-text">If you need to contact your Housing Officer: neighbourhood@hackney.gov.uk, 020 8356 3330</div>
      </>
    );
  }

  private renderSignature(){
    return(
      <>
        <div className="signature-header">Signature of TRA representative</div>
        <div>
          <img id="signature-image" src={this.props.signOff.signature} alt="signature" />
        </div>
      </>
    );
  }
}

export default Confirmation;