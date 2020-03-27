import React, { Component } from "react";
import './index.css';
import { IMeetingModel } from "../../../Domain/Meeting";
import { Link } from "react-router-dom";
import { ITraInfo } from "../../../Boundary/TRAInfo";

export interface IDraftSelectorProps {
    meeting: IMeetingModel,
    tra: ITraInfo
}

export default class DraftSelector extends Component<IDraftSelectorProps, {}> { 
    public constructor(props: IDraftSelectorProps) {
        super(props);
    }

    public render() {
        return (
            <Link 
                className="draft-selection-text"
                data-test="meeting-name" 
                to={{
                    pathname: "/etra/savemeeting/",
                    state: {
                        meeting: this.props.meeting,
                        selectedTra: this.props.tra
                    }
                }}
            >
                {this.props.meeting.meetingName}
            </Link> 
        )
    }
}