
export interface IJWTGateway {
  saveMeetingToken: (data: string) => Promise<void>;
  saveSignoffToken: (data: string) => Promise<void>;
  getMeetingToken: () => Promise<string>;
  getSignoffToken: () => Promise<string>;
}

export default class JWTGateway implements IJWTGateway {
  public async saveMeetingToken(data: string): Promise<void> {
    return await localStorage.setItem("MeetingToken", data);
  }

  public async saveSignoffToken(data: string): Promise<void> {
    return await localStorage.setItem("SignOffToken", data);
  }

  public async getMeetingToken(): Promise<string> {
    return await localStorage.getItem("MeetingToken") || "";
  }

  public async getSignoffToken(): Promise<string> {
    return await localStorage.getItem("SignOffToken") || "";
  }
}
