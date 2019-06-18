import React, { ChangeEvent, Component } from 'react';
import './index.css';

export interface IAttendees {
    Councillors: string,
    HackneyStaff: string,
    NumberOfAttendees: number
}

export interface IAttendeesState {
    isCollapsed: boolean,
    attendees: IAttendees
}

export interface IAttendeesProp {
    readOnly: boolean,
    attendees: IAttendees,
    onChangeAttendees: (attendees: IAttendees) => void;
}

export class Attendees extends Component<IAttendeesProp, IAttendeesState> {

    public constructor(props: IAttendeesProp) {
        super(props);
        this.state = {
            isCollapsed: false,
            attendees: this.props.attendees
        }
    }

   static defaultProps = {
        attendees: {
            Councillors: "",
            HackneyStaff: "",
            NumberOfAttendees: 0
        }
    }

    toggleCollapsed = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed });
    }

    onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            attendees: {
                ...this.state.attendees,
                [name]: [value]
            }
        });
        this.props.onChangeAttendees(this.state.attendees)
    }

    render() {
        return (
            <div>
                {this.renderArrow()}
                <span data-test="meeting-attendance-header" className="attendance-header">Meeting Attendance</span>
                {!this.state.isCollapsed && this.renderInputs()}
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
                {this.conditionalRender(this.renderText(this.state.attendees.Councillors), this.renderCouncillors())}
                <div data-test="hackney-council-staff-label" className="input-label">Hackney Council Staff</div>
                {this.conditionalRender(this.renderText(this.state.attendees.HackneyStaff), this.renderHackneyStaff())}
                <div data-test="number-of-attendees-label" className="input-label">Number of attendees</div>
                {this.conditionalRender(this.renderText(this.state.attendees.NumberOfAttendees.toString()), this.renderNumberOfAttendees())}
            </ div>
        );
    }

    renderCouncillors() {
        return (
            <input 
                data-test="councillor-input" 
                className="input-box wide-box" 
                type="text" name="Councillors" 
                onChange={this.onChangeForm} 
                value={this.state.attendees.Councillors} />
        )
    }

    renderHackneyStaff() {
        return (
            <input 
                data-test="hackney-council-staff-input" 
                className="input-box wide-box" 
                type="text" name="HackneyStaff" 
                onChange={this.onChangeForm} 
                value={this.state.attendees.HackneyStaff} />
        )
    }

    renderNumberOfAttendees() {
        return (
            <input 
                data-test="number-of-attendees-input" 
                className="input-box narrow-box" 
                type="number" name="NumberOfAttendees" 
                onChange={this.onChangeForm} 
                value={this.state.attendees.NumberOfAttendees} />
        )
    }

    conditionalRender(readOnly: any, notReadOnly: any){
        return (<>{this.props.readOnly ? readOnly : notReadOnly}</>);
    }

    renderText(text: string){
        return (<div className="display-box">{text}</div>);
    }
}

export default Attendees