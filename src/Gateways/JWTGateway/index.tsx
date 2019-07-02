
export interface IJWTGateway {
  saveMeetingToken: (data: string) => Promise<void>;
  saveSignoffToken: (data: string) => Promise<void>;
}

export default class JWTGateway implements IJWTGateway {

  public async saveMeetingToken(data: string): Promise<void> {
    return await localStorage.setItem("MeetingToken", data);
  }
  public async saveSignoffToken(data: string): Promise<void> {
    return await localStorage.setItem("signOffToken", data);
  }
}
