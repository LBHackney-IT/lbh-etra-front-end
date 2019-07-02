import React, { Component, FormEvent } from "react";
import './index.css';
import { Redirect } from "react-router-dom";
import areaData from "../../JsonFiles/AreaData.json"
import { IArea } from "../../Domain/Area";
import { ITraInfo } from "../../Boundary/TRAInfo";
import { Location } from 'history';
import queryString from 'query-string';
import { ServiceContext, IServiceProvider } from "../../ServiceContext";
import { IMeetingModel } from "../../Domain/Meeting";
import { IGetMeetingDraftsUseCase } from "../../Boundary/GetMeetingDrafts";
import DraftSelector from "../DraftSelector";

export interface ILandingPageProps {
    location: Location;
}

export interface ILandingPageState {
    valid: boolean,
    redirect: boolean,
    selectedTraId: string,
    draftMeetings: IMeetingModel[]
}

export default class LandingPage extends Component<ILandingPageProps, ILandingPageState> { 
    public static contextType = ServiceContext;
    private readonly getDrafts : IGetMeetingDraftsUseCase;

    private areas = Array.from<IArea>(areaData);
    private tras : Array<ITraInfo>;

    public constructor(props: ILandingPageProps, context: IServiceProvider) {
        super(props);
        
        this.getDrafts = context.get<IGetMeetingDraftsUseCase>("IGetMeetingDraftsUseCase");

        const query = queryString.parse(this.props.location.search);

        let traId = ""
        let traIdExists = false;
        if(query.traId){
            traId = query.traId as string;
            traIdExists = true;
        }

        this.state = { 
            valid: traIdExists,
            redirect: traIdExists,
            selectedTraId: traId,
            draftMeetings: []
        }

        this.tras = this.populateTras();
    }

    public componentDidMount(){
        this.getDrafts.Execute().then((result : IMeetingModel[]) => {
            this.setState({draftMeetings: result});
        })
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

    private findSelectedTra(traId: string) : ITraInfo | undefined {
        return this.tras.find((traInfo) => traInfo.tra.id.toString() === traId);
    }

    onChangeSelection = (event: FormEvent<HTMLSelectElement>) : void => {
        console.log(event.currentTarget.value);
        this.setState({selectedTraId: event.currentTarget.value});
        this.checkIsValid(event.currentTarget.value);
    }

    checkIsValid = (selectedTraId: string) : void => {
        const valid = !!selectedTraId;
        console.log(`selectedTraId: ${selectedTraId}`)
        console.log(`isValid: ${valid}`)
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
                                selectedTra: this.findSelectedTra(this.state.selectedTraId)
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
                <div className="draft-wrapper">
                    <div className="draft-list-header" data-test="draft-list-header">
                        ETRA meetings for review by TRA representative
                    </div>
                    {
                        this.state.draftMeetings.length > 0 ? 
                        this.state.draftMeetings.map(this.renderDraft, this) : 
                        <div className="no-draft-text" data-test="no-draft-meetings">No meetings found</div>
                    }
                </div>
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

    private renderDraft(meeting: IMeetingModel){
        const tra = this.findSelectedTra(meeting.traId.toString());
        if(tra === undefined){return;}

        return (
            <div data-test="meeting-draft" key={meeting.id} className="draft-text">
                <DraftSelector meeting={meeting} tra={tra}/>
            </div>
        )
    }
}