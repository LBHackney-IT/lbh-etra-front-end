import React, { Component } from "react";
import SignatureCanvas from 'react-signature-canvas';
import './index.css';

interface ISignatureProps {
  height: number,
  displayClearButton : boolean
}

export default class Signature extends Component<ISignatureProps> {
  static defaultProps = {
    height: 300,
    displayClearButton: true
  }

  sigCanvas : SignatureCanvas | null;

  constructor(props: ISignatureProps) {
    super(props);

    this.sigCanvas = null;
    this.clearCanvasButtonClicked = this.clearCanvasButtonClicked.bind(this);
  }

  public render() {
    return (
      <>
        <SignatureCanvas 
          clearOnResize={false} 
          canvasProps={{height: this.props.height, className: "signature"}}
          ref={(ref) => { this.sigCanvas = ref }}
        />
        {this.props.displayClearButton && this.clearButton()}
      </>
    )
  }

  private clearButton() {
    return(
      <input
        type="button" 
        value="Clear Signature" 
        onClick={this.clearCanvasButtonClicked} 
        className="clear-button"
      />);
  }

  private clearCanvasButtonClicked() : void {
    if(this.sigCanvas != null){
      this.sigCanvas.clear();
    }
  }
}