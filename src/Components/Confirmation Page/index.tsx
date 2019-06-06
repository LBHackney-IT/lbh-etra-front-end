import React from 'react';
import { IIssue } from '../Issues';
import './index.css';

export interface IConfirmationProps {
  SignatureImage: string,
}

export interface IConfirmationState {
  issues: Array<IIssue>
}

export class Confirmation extends React.Component<IConfirmationProps, IConfirmationState> {

  jsonIssueResponse = []

  public constructor(props: IConfirmationProps) {
    super(props);

    this.state = { issues: this.jsonIssueResponse }
    //this.setState({issues :this.jsonIssueResponse})
  }

  public static defaultProps: Partial<IConfirmationProps> = {
    SignatureImage: ""
  };


  public state: IConfirmationState = {
    issues: Array<IIssue>()
  };

  // displayIssues()
  // {
  //   return( 
  //     <div>
  //         <div>
  //             {
  //               this.state.issues.map((item, key) => {
  //                 return <div key={key} >
  //                   <div className="issue-details">
  //                     <div>
  //                   <p className="label-title">Issue Type</p>
  //                <p>{item.IssueType}</p> </div>
  //                <p className="label-title"> Location Of Issue</p>
  //                <p>{item.LocationOfIssue} </p>
  //                <p className="label-title">Notes about the issue</p>
  //                <p>{item.Notes}</p>
  //                </div>
  //                </div>
  //             })
  //             }
  //         </div>
  //     </div>
  //   )
  // }

  render() {
    return (
      <div className="signature">
        <div className="signature-header">Signature of TRA representative</div>
        <div>
          <img id="signature-image" src={this.props.SignatureImage} alt="signature" />
        </div>
        <div className="tra-chair-header">TRA Chair</div>
      </div>
    );
  }
}

export default Confirmation;