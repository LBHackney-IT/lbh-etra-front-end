import React, { FormEvent } from 'react';
import './index.css';
import SaveMeeting from '../../SaveMeeting';
import SaveETRAMeeting from '../SaveETRAMeeting'
import { IIssue } from '../../../Domain/Issues'
import Signature from '../../Signature';
import Confirmation from '../../ConfirmationPage';
import ConfirmLater from '../../ConfirmLater';
import { IAttendees } from '../../../Domain/Attendees';
import { ITraInfo } from '../../../Boundary/TRAInfo';
import { ISignOff, SignOff } from '../../../Domain/SignOff';
import RepName from '../../RepName'
import EmailSignOff from '../EmailSignOff';
import SignatureSignOff from '../SignatureSignOff';

export interface IReviewMeetingProps {
    isComplete: boolean,
    traId: number,
    meetingId?: string,
    meetingName: string,
    issues: Array<IIssue>,
    onSaveComplete: () => void
    attendees:IAttendees,
    isSessionLive?:boolean,
    signOffMode: boolean;
    signOff:ISignOff,
    traEmailSignOff: boolean,
    selectedTra: ITraInfo,
}

export interface IReviewMeetingState {
    pageState: ReviewMeetingDisplayState,
    signOff: ISignOff,
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

export default class ReviewETRAMeeting extends React.Component<IReviewMeetingProps, IReviewMeetingState> {

    public constructor(props: IReviewMeetingProps) {
        super(props);

        const pageState = this.props.isComplete ? 
            ReviewMeetingDisplayState.ReviewComplete : 
            ReviewMeetingDisplayState.Ready;

        this.state = {
            pageState: pageState,
            signOff: this.props.signOff,
        }
    }

    public static defaultProps = {
        issues: Array<IIssue>(),
        attendees: {},
        signOffMode: false,
        signOff: new SignOff("", "", roles[0].name),
        traEmailSignOff: false,
        selectedTra: {}
    };

    private updateSignatureString = (value: string) : void => {
        let signOff = this.state.signOff;
        signOff.signature = value;
        this.setState({ signOff: signOff });
    }

    private updateRole = (event: FormEvent<HTMLInputElement>) : void => {
        let signOff = this.state.signOff || {signature: ""};
        signOff.role = event.currentTarget.value;
        this.setState({ signOff: signOff });
    }

    private updateRepName = (value:string) : void => {
        let signOff = this.state.signOff || {signature: ""};
        signOff.name = value;
        this.setState({ signOff:signOff });
    }

    private onReviewLater = () : void => {
        this.setState({pageState: ReviewMeetingDisplayState.ReviewLater})
        //this.props.onSaveComplete();

    }

    private onReviewNow = () : void => {
        this.setState({pageState: ReviewMeetingDisplayState.ReviewComplete});
        //this.props.onSaveComplete();
    }

    render() {
        if(this.state.pageState === ReviewMeetingDisplayState.ReviewComplete){
          return (<Confirmation signOff={this.state.signOff} reviewedLater={this.props.signOffMode}/>);
        }

        if(this.state.pageState === ReviewMeetingDisplayState.ReviewLater){
            return (<ConfirmLater />);
        }

        if(this.props.traEmailSignOff){
            return this.renderEmailSignOff();
        }
        return this.renderSignatureSignOff();
    }

   /*  render() {
        if(this.props.traEmailSignOff){
            return this.renderEmailSignOff();
        }
        return this.renderSignatureSignOff();
    } */
    
    renderSignature(){
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

    private renderEmailSignOff() {
        return (
            <div>
                <div className="review-button">
                    <EmailSignOff
                        onReviewLater={this.onReviewLater}
                        signOffMode={this.props.signOffMode}
                        traId={this.props.traId}
                        meetingId={this.props.meetingId}
                        meetingName={this.props.meetingName}
                        issues={this.props.issues} 
                        signOff={this.state.signOff} 
                        attendees={this.props.attendees}
                        isSessionLive={this.props.isSessionLive}
                        selectedTra={this.props.selectedTra}
                        />
                </div>
            </div>
        );
    }

    private renderSignatureSignOff() {
        return (
            <div>
            {this.conditionalRender(<></>, this.renderSignature())}
            <div className="rep-name">
                <RepName onUpdated={this.updateRepName}></RepName>
            </div>
            <div className="role-of-TRA-representative">Role of TRA representative</div>
            {roles.map(this.renderRole, this)}
            <div className="review-button">
                <SignatureSignOff
                    signOffMode={this.props.signOffMode}
                    traId={this.props.traId}
                    meetingId={this.props.meetingId}
                    meetingName={this.props.meetingName}
                    issues={this.props.issues} 
                    signOff={this.state.signOff} 
                    attendees={this.props.attendees}
                    isSessionLive={this.props.isSessionLive}
                    />
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
                    checked={this.state.signOff && this.state.signOff.role === role.name}/>
                <div className="radio-unselected">
                    <div className="radio-selected"></div>
                </div>
                <div className="radio-text">{role.name}</div>
            </label>
        );
    }
}

