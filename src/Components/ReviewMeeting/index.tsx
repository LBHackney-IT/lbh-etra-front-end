import React from 'react';
import './index.css';
import SaveMeeting from '../SaveMeeting';
import { IIssue } from '../../Domain/Issues'
import Signature from '../Signature';
import Confirmation from '../Confirmation Page';
import { IAttendees } from '../Attendees';

export interface IReviewMeetingProps {
    issues: Array<IIssue>,
    onReviewComplete: () => void
    attendees:IAttendees
}

export interface IReviewMeetingState {
    pageState: PageState,
    signatureBase64: string,
}

enum PageState {
    Ready,
    ReviewComplete,
    ReviewLater
}

export class ReviewMeeting extends React.Component<IReviewMeetingProps, IReviewMeetingState> {

    public constructor(props: IReviewMeetingProps) {
        super(props);
        this.state = {
            pageState: PageState.Ready,
            signatureBase64: ""
        }
    }

    public static defaultProps = {
        issues: Array<IIssue>(),
        attendees: {}
    };

    private updateSignatureString = (value: string) : void => {
        this.setState({ signatureBase64: value });
    }

    private onReviewLater = () : void => {
        this.setState({pageState: PageState.ReviewLater})
        this.props.onReviewComplete();
    }

    private onSaveComplete = () : void => {
        this.setState({pageState: PageState.ReviewComplete});
        this.props.onReviewComplete();
    }

    render() {
        if(this.state.pageState === PageState.ReviewComplete){
            return this.renderConfirmation();
        }

        if(this.state.pageState === PageState.ReviewLater){
            return this.renderReviewLater();
        }

        return this.renderReview();
    }

    private renderReviewLater() {
        return (
            <h2>You reviewed later yay</h2>
        );
    }

    private renderConfirmation() {
        return (
          <Confirmation SignatureImage={this.state.signatureBase64} />
        )
      }

    private renderReview() {
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

                <SaveMeeting onSaveComplete={this.onSaveComplete} issues={this.props.issues} signature={this.state.signatureBase64} attendees={this.props.attendees}/>
                <button className="button btn-primary btn-stacked" id="review-later" onClick={this.onReviewLater}>TRA representative to review later</button>
            </div>
        );
    }
}

export default ReviewMeeting;