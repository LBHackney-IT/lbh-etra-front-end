
export interface IJWTGateway {
  saveOfficerToken: (data: string) => Promise<void>;
  saveTraToken: (data: string) => Promise<void>;
  getOfficerToken: () => Promise<string>;
  getTraToken: () => Promise<string>;
}

export default class JWTGateway implements IJWTGateway {
  public async saveOfficerToken(data: string): Promise<void> {
    return await localStorage.setItem("OfficerToken", data);
  }

  public async saveTraToken(data: string): Promise<void> {
    return await localStorage.setItem("TraToken", data);
  }

  public async getOfficerToken(): Promise<string> {
    return await localStorage.getItem("OfficerToken") || "";
  }

  public async getTraToken(): Promise<string> {
    return await localStorage.getItem("TraToken") || "";
  }
}
