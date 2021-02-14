import { IAuthService } from "./IAuthService";
import { IAntiForgeryData } from "./IAntiForgeryData";
import { IAuthCredentials } from "./IAuthCredentials";

export default class AuthService implements IAuthService {

    public constructor() {
        this.getAntiForgeryDataAsync = this.getAntiForgeryDataAsync.bind(this);
        this.authenticateAsync = this.authenticateAsync.bind(this);
        this.logout = this.logout.bind(this);
    }

    public async getAntiForgeryDataAsync(): Promise<IAntiForgeryData> {
        const response = await fetch("api/account/getantiforgerydata", {
            method: "POST"
        });
        const data = await response.json();
        return data;
    }

    public async getAuthStatusAsync(antiForgeryData: IAntiForgeryData): Promise<{ isAuthenticated: boolean; }> {
        const headers: string[][] = [["Content-Type", "application/json"], [antiForgeryData.antiForgeryHeader, antiForgeryData.antiForgeryToken]];
        const response = await fetch("api/account/authstatus", {
            method: "POST",
            headers: headers
        });
        const result = await response.json();
        return result;
    }

    public async authenticateAsync(credentials: IAuthCredentials, antiForgeryData: IAntiForgeryData): Promise<string> {
        const headers: string[][] = [["Content-Type", "application/json"], [antiForgeryData.antiForgeryHeader, antiForgeryData.antiForgeryToken]];
        const response = await fetch("api/account/authenticate", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(credentials)
        });
        const result = await response.text();
        return result;
    }

    public async logout(): Promise<{ isAuthenticated: boolean; }> {
        const response = await fetch("api/account/logout", {
            method: "POST"
        });
        const result = await response.json();
        return result;
    }
}