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
    onSaveComplete: () => void
    attendees:IAttendees
}

export interface IReviewMeetingState {
    pageState: ReviewMeetingDisplayState,
    signatureBase64: string,
    role: any
}

export enum ReviewMeetingDisplayState {
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
            pageState: ReviewMeetingDisplayState.Ready,
            signatureBase64: "",
            role:""
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
        this.setState({pageState: ReviewMeetingDisplayState.ReviewLater})
        this.props.onSaveComplete();
    }

    private onReviewNow = () : void => {
        this.setState({pageState: ReviewMeetingDisplayState.ReviewComplete});
        this.props.onSaveComplete();
    }

    render() {
        if(this.state.pageState === ReviewMeetingDisplayState.ReviewComplete){
          return (<Confirmation role={this.state.role} SignatureImage={this.state.signatureBase64} />);
        }

        if(this.state.pageState === ReviewMeetingDisplayState.ReviewLater){
            return (<ConfirmLater />);
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
                        onReviewNow={this.onReviewNow} 
                        onReviewLater={this.onReviewLater}
                        issues={this.props.issues} 
                        signature={this.state.signatureBase64} 
                        attendees={this.props.attendees}/>
                </div>
            </div>
        );
    }
    handleChangeOfRole (event: React.ChangeEvent<HTMLInputElement>): void {
        let selectedRole = event.target.value;
        // if(selectedRole===undefined){
        //     this.setState({role:""})
        // }
        this.setState(
            {
                role:selectedRole
            }
        );
    }

    private renderRole(role: IRole){
        return (
            <label key={role.id} className="radio-option" id={role.id}>
                <input type="radio" name="tra-role" onChange={this.handleChangeOfRole.bind(this)} value={role.name} />
                <div className="radio-unselected">
                    <div className="radio-selected"></div>
                </div>
                <div className="radio-text">{role.name}</div>
            </label>
        );
    }
}

