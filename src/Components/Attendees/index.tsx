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

export interface IAttendeesProp{
    onChangeAttendees: (attendees: IAttendees) => void;
}

export class Attendees extends Component<IAttendeesProp, IAttendeesState> {

        public constructor(props: IAttendeesProp) {
            super(props);
            this.state = {
                isCollapsed: false,
                attendees: {
                    Councillors: "",
                    HackneyStaff: "",
                    NumberOfAttendees: 0
                }
            }
        }

        toggleCollapsed = () => {
            this.setState({isCollapsed: !this.state.isCollapsed});
        }
  
        onChangeForm = (event : ChangeEvent<HTMLInputElement>) => {
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
            return(
                <div>
                    {this.renderArrow()}
                    <span className="meeting-attendance-header">Meeting Attendance</span>
                    {!this.state.isCollapsed && this.renderInputs()}
                </div>
            )
        }

        renderArrow() {
            return (
                <a onClick={this.toggleCollapsed}>
                    {this.state.isCollapsed ? <span>Expand</span> :  <span>Collapse</span>}
                </a>
            );
        }

        renderInputs() {
            return (
                <div className="boarder-left">
                    <div><label className="councillor-label">Councillors</label></div>
                    <div><input className="councillor-input" type="text" name="Councillors" onChange={this.onChangeForm} value={this.state.attendees.Councillors}/></div>
                    <div><label className="hackney-council-staff-label">Hackney Council staff</label></div>
                    <div><input className="hackney-council-staff-input" type="text" name="HackneyStaff" onChange={this.onChangeForm} value={this.state.attendees.HackneyStaff}/></div>
                    <div><label className="number-of-attendees-label">Number of attendees</label></div>
                    <div><input className="number-of-attendees-input" type="number" name="NumberOfAttendees"onChange={this.onChangeForm} value={this.state.attendees.NumberOfAttendees}/></div>
                    <div>{this.state.attendees.Councillors}</div>
                    <div>{this.state.attendees.HackneyStaff}</div>
                    <div>{this.state.attendees.NumberOfAttendees}</div> 
                </ div>
            );
        }
}

export default Attendees