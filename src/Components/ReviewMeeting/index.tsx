import React from 'react';
import './index.css';
import SaveMeeting from '../SaveMeeting';
import { IIssue } from '../../Domain/Issues'
import Signature from '../Signature';
import Confirmation from '../Confirmation Page';
import { IAttendees } from '../Attendees';
import ConfirmLater from '../ConfirmLater';

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

interface IRole {
    id: string,
    name: string
}

const roles : Array<IRole> = [
    {id: "chair", name: "Chair"},
    {id: "vice-chair", name: "Vice Chair"},
    {id: "secretary", name: "Secretary"},
    {id: "treasurer", name: "Treasurer"},
]

export default class ReviewMeeting extends React.Component<IReviewMeetingProps, IReviewMeetingState> {

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
          return (<Confirmation SignatureImage={this.state.signatureBase64} />);
        }

        if(this.state.pageState === PageState.ReviewLater){
            return (<ConfirmLater/>);
        }

        return this.renderReview();
    }

    private renderReview() {
        return (
            <div>
                <div className="signature-wrapper">
                <div className="signature-of-TRA-rep">Signature of TRA representative</div>
                    <Signature onUpdated={this.updateSignatureString} />
                </div>

                <div className="role-of-TRA-representative">Role of TRA representative</div>
                {roles.map(this.renderRole)}
                <div className="review-button">
                    <SaveMeeting 
                        onSaveComplete={this.onSaveComplete} 
                        issues={this.props.issues} 
                        signature={this.state.signatureBase64} 
                        attendees={this.props.attendees}/>
                </div>
                <button className="button btn-primary btn-stacked review-button" id="review-later" onClick={this.onReviewLater}>TRA representative to review later</button>
            </div>
        );
    }

    private renderRole(role: IRole){
        return (
            <label key={role.id} className="radio-option" id={role.id}>
                <input type="radio" name="tra-role" value={role.name} />
                <div className="radio-unselected">
                    <div className="radio-selected"></div>
                </div>
                <div className="radio-text">{role.name}</div>
            </label>
        );
    }
}