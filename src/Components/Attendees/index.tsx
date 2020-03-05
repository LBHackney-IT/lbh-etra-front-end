import React, { ChangeEvent, Component } from 'react';
import './index.css';
import { IAttendees } from '../../Domain/Attendees';

export interface IAttendeesState {
    isCollapsed: boolean,
    attendees: IAttendees
}

export interface IAttendeesProp {
    readOnly: boolean,
    attendees: IAttendees,
    isComplete: boolean,
    onChangeAttendees: (attendees: IAttendees) => void;
}

export class Attendees extends Component<IAttendeesProp, IAttendeesState> {

    public constructor(props: IAttendeesProp) {
        super(props);
        //fix for bad response from api
        if(!props.attendees)
            props.attendees = {councillors: '', hackneyStaff: '',  attendees: 1};
        if (!props.attendees.councillors)
            props.attendees.councillors = '';

        if (!props.attendees.hackneyStaff)
            props.attendees.hackneyStaff = '';
            
        this.state = {
            isCollapsed: false,
            attendees: this.props.attendees
        }
    }

    toggleCollapsed = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        const attendees = {
            ...this.state.attendees,
            [name]: value
        }

        this.setState({attendees});
        this.props.onChangeAttendees(attendees); 
    }

    onChangeNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = parseInt(event.currentTarget.value);
        const attendees = {
            ...this.state.attendees,
            [name]: value
        }

        this.setState({attendees});
        this.props.onChangeAttendees(attendees);
    }

    render() {
        return (
            <div>
                {this.props.readOnly && this.props.isComplete === false ? this.render48hReminder() : ""}
                {this.renderArrow()}
                <span data-test="meeting-attendance-header" className="attendance-header">Meeting attendance</span>
                {!this.state.isCollapsed && this.renderInputs()}
            </div>
        )
    }
    render48hReminder(){
        return(
            <div>
                <p className ="heading">Issues for sign off by TRA representative</p>
                <p>Please confirm the issues from the recent ETRA meeting are correct. </p>
                <p>Please note: if you have not signed off the issues within 48 hours of the ETRA meeting taking place, 
                it will be assumed that what has been recorded is accurate.</p>
                <p>If you need to discuss any of the issues further, please contact your Housing Officer: neighbourhood@hackney.gov.uk, 020 8356 3330.</p>
            </div>
        )
    }
    
    renderArrow() {
        return (
            <span onClick={this.toggleCollapsed} className="arrow">
                {this.state.isCollapsed ? <>►</> : <>▼</>}
            </span>
        );
    }

    renderInputs() {
        return (
            <div className={`border-left ${this.props.readOnly ? "read-only-background" : ""}`}>
                <div data-test="councillor-label" className="input-label">Councillors</div>
                {this.conditionalRender(this.renderText(this.state.attendees.councillors, "councillors-text"), this.renderCouncillors())}
                <div data-test="hackney-council-staff-label" className="input-label">Hackney Council Staff</div>
                {this.conditionalRender(this.renderText(this.state.attendees.hackneyStaff, "staff-text"), this.renderHackneyStaff())}
                <div data-test="number-of-attendees-label" className="input-label">Number of attendees</div>
                {this.conditionalRender(this.renderText(this.state.attendees.attendees.toString(), 'number-of-attendees-text'), this.renderAttendees())}
            </ div>
        );
    }

    renderCouncillors() {
        return (
            <input 
                data-test="councillor-input" 
                className="input-box wide-box"
                type="text" name="councillors"
                id="councillors"
                onChange={this.onChangeForm} 
                value={this.state.attendees.councillors} />
        )
    }

    renderHackneyStaff() {
        return (
            <input 
                data-test="hackney-council-staff-input" 
                className="input-box wide-box" 
                type="text" name="hackneyStaff"
                id="hackney-staff"
                onChange={this.onChangeForm} 
                value={this.state.attendees.hackneyStaff} />
        )
    }

    renderAttendees() {
        return (
            <input 
                data-test="number-of-attendees-input" 
                className="input-box narrow-box" 
                type="number" name="attendees"
                id="number-of-attendees"
                onChange={this.onChangeNumber} 
                value={this.state.attendees.attendees} />
        )
    }

    conditionalRender(readOnly: any, notReadOnly: any){
        return (<>{this.props.readOnly ? readOnly : notReadOnly}</>);
    }

    renderText(text: string, id: string){
        return (<div id={id} data-test={id} className="display-box">{text}</div>);
    }
}

export default Attendees