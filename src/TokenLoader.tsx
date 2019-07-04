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

    if(!this.props.location.search){
      this.setState({forwardUrl: this.props.location.pathname});
      return;
    }
  
    const queries = queryString.parse(this.props.location.search);

    if(queries.meetingtoken){
      this.saveMeetingToken.Execute(queries.meetingtoken as string);
      delete queries.meetingtoken;
    }
    else if(queries.token){
      this.saveSignOffToken.Execute(queries.token as string);
      delete queries.token;
    }

    this.setState({forwardUrl: this.buildForwardUrl(queries)});
  }

  buildForwardUrl(queries: ParsedQuery<string>) : string {
    const keys = Object.keys(queries);
    let query = "?";
    for(let i = 0; i < keys.length; i++){
      query += `${keys[i]}=${queries[keys[i]]}`;

      if(i !== keys.length-1){
        query += "&";
      }
    }

    return `${this.props.location.pathname}${query}`;
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
