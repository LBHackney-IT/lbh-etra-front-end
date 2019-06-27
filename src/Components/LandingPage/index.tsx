import React, { Component, FormEvent } from "react";
import './index.css';
import { Redirect } from "react-router-dom";
import areaData from "../../JsonFiles/AreaData.json"
import { IArea, ITra } from "../../Domain/Area";

export interface ILandingPageState {
    valid: boolean,
    redirect: boolean,
    selectedTraId: string,
}

export default class LandingPage extends Component<{}, ILandingPageState> { 

    private areas = Array.from<IArea>(areaData);
    private tras : Array<ITra>;

    public constructor(props: {}) {
        super(props);
    
        this.state = { 
            valid: false,
            redirect: false,
            selectedTraId: "",
        }

        this.tras = this.populateTras();
    }

    private populateTras() : Array<ITra> {
        let tras = new Array<ITra>();
        this.areas.forEach((area) => {
            area.patches.forEach((patch) => {
                tras = tras.concat(patch.tras);
            })
        })

        return tras;
    }

    private findSelectedTra(selectedId: number) : ITra | undefined {
        return this.tras.find((option) => option.id === selectedId);
    }

    onChangeSelection = (event: FormEvent<HTMLSelectElement>) : void => {
        this.setState({selectedTraId: event.currentTarget.value}, this.checkIsValid);
    }

    checkIsValid = () : void => {
        const valid = !!this.state.selectedTraId;
        this.setState({valid: valid});
    }

    onClickStart = () : void => {
        this.setState({redirect: true});
    }

    public render(){
        if (this.state.redirect) {
            return <Redirect push to={`/meeting/${this.state.selectedTraId}`} />;
        }

        return (
            <div className="landing-page-form">
                <div className="landing-page-header" data-test="header-text">ETRA Meetings</div>
                {this.renderDropdown()}
                <button 
                    data-test="start-meeting" 
                    className="button btn-primary" 
                    onClick={this.onClickStart}
                    disabled={!this.state.valid}>
                    Start ETRA Meeting
                </button>
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
                    {this.tras.map(this.renderDropdownOption)}
                </select>
            </div>
        );
    }

    private renderDropdownOption(option: ITra){
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