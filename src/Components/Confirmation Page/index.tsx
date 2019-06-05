import React from 'react';
import {IIssue} from '../Issues';

  export interface IConfirmationProps{
      TRAName:string,
      DateOfMeeting:Date,
      SignatureImage:string,
      issues:Array<IIssue>,
  }


 
  export interface IConfirmationState{
    issues:Array<IIssue>
  }

  export class Confirmation extends React.Component<IConfirmationProps, IConfirmationState> {

    jsonIssueResponse=[
      {
        "IssueType":"25",
        "LocationOfIssue":"43234",
        "Notes":"12537228724216704",
       
    },
    {
      "IssueType":"25",
      "LocationOfIssue":"43234",
      "Notes":"12537228724216704",
    }]

    public constructor(props:IConfirmationProps){
      super(props);

      this.setState({issues :this.jsonIssueResponse})
    }

    public static defaultProps: Partial<IConfirmationProps> = {
      TRAName:"Test TRA Name",
      DateOfMeeting: new Date(),
      SignatureImage: ""
    };


    public state: IConfirmationState = {
      issues:Array<IIssue>()
    };

    displayIssues()
    {
      return(
        <div>
            <ul>
                {
                  
                  this.state.issues.map((item, key) => {
                    return <li key={key}>{item.IssueType} {item.LocationOfIssue} {item.Notes}</li>
                })
                    })
                }
            </ul>
        </div>
    )

    }
    render() {
      return (
          <div>
            <div className="back-link"><a id="lnkBack" href="#">Back</a></div>
            <div className="meeting-name-date">{this.props.TRAName} ETRA meeting {this.props.DateOfMeeting.toLocaleDateString('en-GB')}</div>
            <div className="issue-confirmed">Issues confirmed</div>
            <div className="signature">
            <div className="signature-header">Signature of TRA representative</div>
            <div>
              <img id="signature-image" src={this.props.SignatureImage} alt="signature"/>
            </div>
            </div>
        </div>
      );
    }
  }

  export default Confirmation;