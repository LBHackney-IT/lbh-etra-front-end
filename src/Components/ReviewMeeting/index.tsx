import React from 'react';
import './index.css';
import SaveMeeting from '../SaveMeeting';
import { IIssue } from '../../Domain/Issues'
import Signature from '../Signature';
import Confirmation from '../Confirmation Page';

export interface IReviewMeetingProps {
    issues: Array<IIssue>,
    onReviewComplete: () => void
}

export interface IReviewMeetingState {
    reviewComplete: boolean,
    isReviewingNow: boolean,
    signatureBase64: string,
}

export class ReviewMeeting extends React.Component<IReviewMeetingProps, IReviewMeetingState> {

    public constructor(props: IReviewMeetingProps) {
        super(props);
        this.state = {
            reviewComplete: false,
            isReviewingNow: false,
            signatureBase64: ""
        }
    }

    public static defaultProps = {
        issues: Array<IIssue>()
    };

    handleIsReviewingNow = () => {
        this.setState({ isReviewingNow: true });
    }

    updateSignatureString = (value: string) => {
        this.setState({ signatureBase64: value });
    }

    render() {
        if(this.state.reviewComplete){
            return this.renderConfirmation();
        }

        if (this.state.isReviewingNow) {
            return this.renderReviewNow();
        }
        else {
            return this.renderButtons();
        }
    }

    private renderConfirmation() {
        return (
          <Confirmation SignatureImage={this.state.signatureBase64} />
        )
      }

    private renderButtons() {
        return (
            <div>
                <div className="ready-for-review-by">Ready for review by TRA representative?</div>
                <button className="button btn-primary btn-stacked" id="review-now" onClick={this.handleIsReviewingNow}>Review now with TRA</button>
                <button className="button btn-primary btn-stacked" id="review-later">TRA representative to review later</button>
            </div>
        );
    }

    private renderReviewNow() {
        return (
            <div>
                <div className="signature-of-TRA-rep">Signature of TRA representative</div>
                <div>
                    <Signature onUpdated={this.updateSignatureString} />
                </div>
                <div className="role-of-TRA-representative">Role of TRA representative</div>

                <div><input id="chair" className="radio-unselected" type="radio" name="tra-role" value="Chair"></input><span className="radio-text">Chair</span></div>
                <div><input id="vice-chair" className="radio-unselected" type="radio" name="tra-role" value="Vice Chair"></input><span className="radio-text">Vice Chair</span></div>
                <div><input id="secretary" className="radio-unselected" type="radio" name="tra-role" value="Secretary"></input><span className="radio-text">Secretary</span></div>
                <div><input id="treasurer" className="radio-unselected" type="radio" name="tra-role" value="Treasurer"></input><span className="radio-text">Treasurer</span></div>

                <SaveMeeting onSaveComplete={this.onSaveComplete} issues={this.props.issues} signature={this.state.signatureBase64} />
            </div>
        );
    }

    private onSaveComplete = () : void => {
        this.setState({reviewComplete: true});
        this.props.onReviewComplete();
    }
}

export default ReviewMeeting;