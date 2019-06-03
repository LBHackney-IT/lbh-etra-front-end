import React from 'react';

  export interface IConfirmationProps{
      TRAName:string,
      DateOfMeeting:Date,

  }

  export interface IConfirmationState{
    
  }

  export class Confirmation extends React.Component<IConfirmationProps, IConfirmationState> {

    public constructor(props:IConfirmationProps){
      super(props);
    }

    public static defaultProps: Partial<IConfirmationProps> = {
      TRAName:"Test TRA Name",
      DateOfMeeting: new Date()
    };

    public state: IConfirmationState = {
      
    };
  
    render() {
      return (
        <div>
            {this.props.TRAName} ETRA meeting {this.props.DateOfMeeting.toLocaleDateString('en-GB')}
        </div>
      );
    }
  }

  export default Confirmation;