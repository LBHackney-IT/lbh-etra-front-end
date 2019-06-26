import React from 'react';
import './index.css';
import SaveMeeting from '../SaveMeeting';
import { IIssue } from '../../Domain/Issues'
import Signature from '../Signature';
import Confirmation from '../Confirmation Page';
import { IAttendees } from '../Attendees';
import ConfirmLater from '../ConfirmLater';
import RepName from '../RepName'

export interface IReviewMeetingProps {
    issues: Array<IIssue>,
    onSaveComplete: () => void
    attendees:IAttendees
}

export interface IReviewMeetingState {
    pageState: ReviewMeetingDisplayState,
    signatureBase64: string,
    role: IRole,
    repName:string
    readOnly:boolean
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
            signatureBase64: "",
            role:{
                id:"",
                name:""
            },
            repName:"",
            readOnly:false
        }
    }

    public static defaultProps = {
        issues: Array<IIssue>(),
        attendees: {}
    };

    private updateSignatureString = (value: string) : void => {
        this.setState({ signatureBase64: value });
    }
    private updateRepName = (value:string) : void => {
        this.setState({repName:value})
    }

    private onReviewLater = () : void => {
        this.setState({pageState: ReviewMeetingDisplayState.ReviewLater})
        this.props.onSaveComplete();
        this.setState({readOnly:true})

    }

    private onReviewNow = () : void => {
        this.setState({pageState: ReviewMeetingDisplayState.ReviewComplete});
        this.props.onSaveComplete();
        const readOnly = this.state.readOnly
        this.setState({readOnly:readOnly})
    }

    render() {
        if(this.state.pageState === ReviewMeetingDisplayState.ReviewComplete){
          return (<Confirmation repName={this.state.repName}role={this.state.role.name} SignatureImage={this.state.signatureBase64} />);
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
                <div className="rep-name">
                    <RepName onUpdated={this.updateRepName}></RepName>
                </div>
                <div className="role-of-TRA-representative">Role of TRA representative</div>
                {roles.map((role)=> this.renderRole(role,this.handleChangeOfRole))}
                <div className="review-button">
                    <SaveMeeting 
                        onReviewNow={this.onReviewNow} 
                        onReviewLater={this.onReviewLater}
                        issues={this.props.issues} 
                        signature={this.state.signatureBase64} 
                        attendees={this.props.attendees}
                        repName={this.state.repName}/>
                        
                </div>
            </div>
        );
    }
    handleChangeOfRole = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let roleId = event.target.value;

        let selectedRole = roles.find(role=> role.id === roleId);
        if(selectedRole === undefined){return;}
        
        this.setState(
            {
                role:selectedRole
            }
        );
    }

    private renderRole(role: IRole, handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void){
        return (
            <label key={role.id} className="radio-option" id={role.id}>
                <input type="radio" name="tra-role" onChange={handleOnChange} value={role.id} />
                <div className="radio-unselected">
                    <div className="radio-selected"></div>
                </div>
                <div className="radio-text">{role.name}</div>
            </label>
        );
    }
}

