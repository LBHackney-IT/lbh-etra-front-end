import React from 'react';
import './index.css';

export default class ConfirmLater extends React.Component {

  render() {
    return (
      <div className="message-box">
        <div className="text-container">
          <div data-test="message-one" id="review-later-one" className="message-text message-one">Any issues have been saved and emailed to the TRA representative.</div>
          <div data-test="message-two" id="review-later-two" className="message-text">You can access the issues from your work tray.</div>
        </div>
      </div>
    );
  }
}