import React, { Component } from "react";
import './index.css';
import { IMeetingModel } from "../../Domain/Meeting";
import { Link } from "react-router-dom";

export interface IDraftSelectorProps {
    meeting: IMeetingModel
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
                    pathname: "/meeting/",
                    state: {
                        meeting: this.props.meeting,
                        selectedTra: {}
                    }
                }}
            >
                {this.props.meeting.meetingName}
            </Link>
        )
    }
}