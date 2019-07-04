import React, { FormEvent } from 'react';
import './index.css';
import SaveMeeting from '../SaveMeeting';
import { IIssue } from '../../Domain/Issues'
import Signature from '../Signature';
import Confirmation from '../ConfirmationPage';
import ConfirmLater from '../ConfirmLater';
import { IAttendees } from '../../Domain/Attendees';
import { ISignOff, SignOff } from '../../Domain/SignOff';
import RepName from '../RepName'

export interface IReviewMeetingProps {
    traId: number,
    meetingId?: string,
    meetingName: string,
    issues: Array<IIssue>,
    onSaveComplete: () => void
    attendees:IAttendees,
    signOffMode: boolean;
    signOff:ISignOff
}

export interface IReviewMeetingState {
    pageState: ReviewMeetingDisplayState,
    signOff: ISignOff,
    readOnly:boolean,
}

export enum ReviewMeetingDisplayState {
    Ready,
    ReviewComplete,
    ReviewLater,
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
            signOff: this.props.signOff,
            readOnly:false,
        }
    }

    public static defaultProps = {
        issues: Array<IIssue>(),
        attendees: {},
        signOffMode: false,
        signOff: new SignOff("", "", roles[0].name)
    };

    private updateSignatureString = (value: string) : void => {
        let signOff = this.state.signOff;
        signOff.signature = value;
        this.setState({ signOff: signOff });
    }

    private updateRole = (event: FormEvent<HTMLInputElement>) : void => {
        let signOff = this.state.signOff;
        signOff.role = event.currentTarget.value;
        this.setState({ signOff: signOff });
    }

    private updateRepName = (value:string) : void => {
        let signOff = this.state.signOff;
        signOff.name = value;
        this.setState({ signOff:signOff });
    }

    private onReviewLater = () : void => {
        this.setState({pageState: ReviewMeetingDisplayState.ReviewLater})
        this.props.onSaveComplete();
        this.setState({ readOnly:true })

    }

    private onReviewNow = () : void => {
        this.setState({pageState: ReviewMeetingDisplayState.ReviewComplete});
        this.props.onSaveComplete();
        const readOnly = this.state.readOnly
        this.setState({readOnly:readOnly})
    }

    render() {
        if(this.state.pageState === ReviewMeetingDisplayState.ReviewComplete){
          return (<Confirmation signOff={this.state.signOff} />);
        }

        if(this.state.pageState === ReviewMeetingDisplayState.ReviewLater){
            return (<ConfirmLater />);
        }

        return this.renderReview();
    }
    renderSigniture(){
        console.log("TEST");
        return(
            <div className="signature-wrapper">
            <div className="signature-of-TRA-rep">Signature of TRA representative</div>
                <Signature onUpdated={this.updateSignatureString} />
            </div>
        )
    }
   
    conditionalRender(signOffMode: any, notSignOffMode: any){
        return (<>{this.props.signOffMode ? signOffMode : notSignOffMode}</>);
    }

    private renderReview() {
        return (
            <div>
                {this.conditionalRender(<></>, this.renderSigniture())}
                <div className="rep-name">
                    <RepName onUpdated={this.updateRepName}></RepName>
                </div>
                <div className="role-of-TRA-representative">Role of TRA representative</div>
                {roles.map(this.renderRole, this)}
                <div className="review-button">
                    <SaveMeeting
                        traId={this.props.traId}
                        meetingId={this.props.meetingId}
                        meetingName={this.props.meetingName}
                        onReviewNow={this.onReviewNow} 
                        onReviewLater={this.onReviewLater}
                        issues={this.props.issues} 
                        signOff={this.state.signOff} 
                        attendees={this.props.attendees}/>
                </div>
            </div>
        );
    }

    private renderRole(role: IRole){
        return (
            <label key={role.id} className="radio-option" id={role.id}>
                <input type="radio" 
                    name="tra-role" 
                    value={role.name} 
                    onChange={this.updateRole} 
                    checked={this.state.signOff.role === role.name}/>
                <div className="radio-unselected">
                    <div className="radio-selected"></div>
                </div>
                <div className="radio-text">{role.name}</div>
            </label>
        );
    }
}

