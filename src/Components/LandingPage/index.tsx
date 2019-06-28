import React, { Component, FormEvent } from "react";
import './index.css';
import { Redirect } from "react-router-dom";
import areaData from "../../JsonFiles/AreaData.json"
import { IArea, ITra } from "../../Domain/Area";
import { ITraInfo } from "../../Boundary/TRAInfo";

export interface ILandingPageState {
    valid: boolean,
    redirect: boolean,
    selectedTraId: string,
}

export default class LandingPage extends Component<{}, ILandingPageState> { 

    private areas = Array.from<IArea>(areaData);
    private tras : Array<ITraInfo>;

    public constructor(props: {}) {
        super(props);
    
        this.state = { 
            valid: false,
            redirect: false,
            selectedTraId: "",
        }

        this.tras = this.populateTras();
    }

    private populateTras() : Array<ITraInfo> {
        let tras = new Array<ITraInfo>();
        this.areas.forEach((area) => {
            area.patches.forEach((patch) => {
                patch.tras.forEach((tra) => {
                    tras.push({
                        patch: patch,
                        tra: tra
                    });
                });
            });
        });

        return tras;
    }

    private findSelectedTra() : ITraInfo | undefined {
        return this.tras.find((traInfo) => traInfo.tra.id.toString() === this.state.selectedTraId);
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
            return <Redirect 
                    push to={
                        {
                            pathname:`/meeting/`,
                            state: {
                                selectedTra: this.findSelectedTra()
                            }
                        }} />;
        }

        return (
            <div className="landing-page-form">
                <div className="landing-page-header" data-test="header-text">ETRA Meetings</div>
                {this.renderDropdown()}
                <button
                    id="start-meeting-button"
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
                    id="tra-select"
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

    private renderDropdownOption(traInfo: ITraInfo){
        return (
            <option 
                data-test="tra-option" 
                value={traInfo.tra.id}
                key={traInfo.tra.id}>
                    {`${traInfo.patch.patchId} - ${traInfo.tra.name}`}
            </option>
        );
    }
}