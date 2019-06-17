import React, { Component, FormEvent } from "react";
import './index.css';
import { v4 as uuid } from 'uuid';

interface ITraDetails {
    id: string,
    name: string,
}

const options : Array<ITraDetails> = [
    { id: uuid(), name: "Test TRA"},
    { id: uuid(), name: "Other TRA"},
    { id: uuid(), name: "Another TRA"}
]

export interface ILandingPageState {
    selectedTraId: string
}

export default class LandingPage extends Component<{}, ILandingPageState> { 
    public constructor(props: {}) {
        super(props);
    
        this.state = { selectedTraId: "" }
    }

    private findSelectedTra(selectedId: string) : ITraDetails | undefined {
        return options.find((option) => option.id === selectedId);
    }

    onChangeSelection = (event: FormEvent<HTMLSelectElement>) : void => {
        this.setState({selectedTraId: event.currentTarget.value});
        console.log(event.currentTarget.value);
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
                    value={this.state.selectedTraId} 
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

    private renderDropdownOption(option: ITraDetails){
        return (
            <option 
                data-test="tra-option" 
                value={option.id}
                key={option.id}>
                    {option.name}
            </option>
        );
    }
}