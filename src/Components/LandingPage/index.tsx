import React, { Component, FormEvent } from "react";
import './index.css';

const options : Array<string> = [
    "Test TRA",
    "Other TRA",
    "Another TRA"
]

export interface ILandingPageState{
    selectedTRA: string
}

export default class LandingPage extends Component<{}, ILandingPageState> { 
    public constructor(props: {}) {
        super(props);
    
        this.state = { selectedTRA: "" }
      }

    onChangeSelection = (event: FormEvent<HTMLSelectElement>) : void => {
        this.setState({selectedTRA: event.currentTarget.value});
    }

    public render(){
        return (
            <div className="landing-page-form">
                <div className="landing-page-header" data-test="header-text">ETRA Meetings</div>
                {this.renderDropdown()}
                <button data-test="start-meeting" className="button btn-primary">Start ETRA Meeting</button>
            </div>
        )
    }

    private renderDropdown(){
        return (
            <div className="tra-select-group">
                <label className="dropdown-label" htmlFor="tra-select" data-test="tra-selection-label">
                    Select TRA
                </label>
                <br />
                <select 
                    value={this.state.selectedTRA} 
                    data-test="tra-selection"
                    name="tra-select" 
                    onChange={this.onChangeSelection}
                    className="tra-select">
                    <option value="" disabled>Select TRA</option>
                    {options.map(this.renderDropdownOption)}
                </select>
            </div>
        );
    }

    private renderDropdownOption(option: string, index: number){
        return (
            <option 
                data-test="tra-option" 
                value={option}
                key={index}>
                    {option}
            </option>
        );
    }
}