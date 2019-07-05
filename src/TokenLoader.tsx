import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ServiceContext, IServiceProvider } from "./ServiceContext";
import { Location } from 'history';
import queryString, { ParsedQuery } from "query-string"
import { ISaveMeetingJWTUseCase } from "./Boundary/SaveMeetingJWTLocally";
import { ISaveSignOffJWTUsecase } from "./Boundary/SaveSignOffJWTLocally";

export interface TokenLoaderProps {
  location: Location
}

export interface TokenLoaderState {
 tokensLoaded: boolean;
 forwardUrl: string;
}

export default class TokenLoader extends Component<TokenLoaderProps, TokenLoaderState> {
  public static contextType = ServiceContext;
  private readonly saveMeetingToken: ISaveMeetingJWTUseCase;
  private readonly saveSignOffToken: ISaveSignOffJWTUsecase;

  public constructor(props: TokenLoaderProps, context: IServiceProvider) {
    super(props, context);
    this.saveMeetingToken = context.get<ISaveMeetingJWTUseCase>("ISaveMeetingJWTUseCase");
    this.saveSignOffToken = context.get<ISaveSignOffJWTUsecase>("ISaveSignOffJWTUsecase");

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
      this.saveMeetingToken.Execute(tokens.officerToken as string);
    }
    
    if(tokens.traToken){
      this.saveSignOffToken.Execute(tokens.traToken as string);
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
