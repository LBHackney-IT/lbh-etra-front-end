import React from 'react';
import './index.css';
import { IIssue } from '../Issues';

  export interface IMeetingProps{
      
  }

  export interface IMeetingState{
    issues: Array<IIssue>,
  }

  export class Meeting extends React.Component<IMeetingProps, IMeetingState> {

    public constructor(props:IMeetingProps){
      super(props);
    }

    public static defaultProps: Partial<IMeetingProps> = {
      squares: Array(9).fill(null),
    };

    public state: IMeetingState = {
      issues: Array<IIssue>()
    };
  
    render() {
      return (
        <div>
            
        </div>
      );
    }
  }

  export default Meeting;