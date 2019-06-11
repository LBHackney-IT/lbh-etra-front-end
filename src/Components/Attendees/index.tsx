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
                    <span className="attendance-header">Meeting Attendance</span>
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
                <div className="border-left">
                    <div className="input-label">Councillors</div>
                    <input className="input-box wide-box" type="text" name="Councillors" onChange={this.onChangeForm} value={this.state.attendees.Councillors}/>
                    <div className="input-label">Hackney Council Staff</div>
                    <input className="input-box wide-box" type="text" name="HackneyStaff" onChange={this.onChangeForm} value={this.state.attendees.HackneyStaff}/>
                    <div className="input-label">Number of attendees</div>
                    <input className="input-box narrow-box" type="number" name="NumberOfAttendees"onChange={this.onChangeForm} value={this.state.attendees.NumberOfAttendees}/>
                </ div>
            );
        }
}

export default Attendees