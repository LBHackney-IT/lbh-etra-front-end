import React, { Component } from "react";
import SignatureCanvas from 'react-signature-canvas';
import './index.css';

interface ISignatureProps {
  height: number,
  displayClearButton : boolean,
  onUpdated: (base64string: string) => void
}

export default class Signature extends Component<ISignatureProps> {
  static defaultProps = {
    height: 300,
    displayClearButton: true,
    onUpdated: null
  }

  sigCanvas : SignatureCanvas | null;

  constructor(props: ISignatureProps) {
    super(props);

    this.sigCanvas = null;
  }

  public componentDidMount(){
    this.canvasUpdated();
  }

  public render() {
    return (
      <>
        <SignatureCanvas 
          clearOnResize={false} 
          canvasProps={{height: this.props.height, className: "signature"}}
          ref={(ref) => { this.sigCanvas = ref }}
          onEnd={this.canvasUpdated}
        />
        {this.props.displayClearButton && this.clearButton()}
      </>
    )
  }

  private clearButton() {
    return(
      <div className="button-wrapper">
        <button
          onClick={this.clearCanvasButtonClicked} 
          className="button-rectangle">
          <span className="button-text">Clear Signature</span>
        </button>
      </div>);
  }

  private clearCanvasButtonClicked = () : void => {
    if(this.sigCanvas != null){
      this.sigCanvas.clear();
      this.canvasUpdated();
    }
  }

  private canvasUpdated = () : void => {
    const base64string = this.getBase64String();
    if(this.props.onUpdated != null){
      this.props.onUpdated(base64string);
    }
  }

  private getBase64String() : string {
    if(this.sigCanvas != null){
      return this.sigCanvas.toDataURL();
    }
    return "";
  }
}