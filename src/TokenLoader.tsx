import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ServiceContext, IServiceProvider } from "./ServiceContext";
import { Location } from 'history';
import queryString from "query-string"
import { ISaveOfficerTokenUseCase } from "./Boundary/SaveOfficerTokenLocally";
import { ISaveTraTokenUsecase } from "./Boundary/SaveTraTokenLocally";

export interface TokenLoaderProps {
  location: Location
}

export interface TokenLoaderState {
 tokensLoaded: boolean;
 forwardUrl: string;
}

export default class TokenLoader extends Component<TokenLoaderProps, TokenLoaderState> {
  public static contextType = ServiceContext;
  private readonly saveOfficerToken: ISaveOfficerTokenUseCase;
  private readonly saveTraToken: ISaveTraTokenUsecase;

  public constructor(props: TokenLoaderProps, context: IServiceProvider) {
    super(props, context);
    this.saveOfficerToken = context.get<ISaveOfficerTokenUseCase>("ISaveOfficerTokenUseCase");
    this.saveTraToken = context.get<ISaveTraTokenUsecase>("ISaveTraTokenUsecase");

    this.state = {
      tokensLoaded: false,
      forwardUrl: ""
    }
  }

  componentDidMount(){
    this.loadTokens();
    this.setState({tokensLoaded: true})
  }

  private loadTokens(){

    if(!this.props.location){
      return;
    }

    if(!this.props.location.hash){
      this.setState({forwardUrl: this.props.location.pathname});
      return;
    }
  
    const tokens = queryString.parse(this.props.location.hash);

    if(tokens.officerToken){
      this.saveOfficerToken.Execute(tokens.officerToken as string);
    }
    
    if(tokens.traToken){
      this.saveTraToken.Execute(tokens.traToken as string);
    }

    this.setState({forwardUrl: `${this.props.location.pathname}${this.props.location.search}`});
  }

  render() {
    if(!this.state.tokensLoaded){
      return (<></>)
    }

    return(
      <Redirect to={this.state.forwardUrl}></Redirect>
    );
  }
}
