import { IAntiForgeryData } from "./IAntiForgeryData";
import { IAuthCredentials } from "./IAuthCredentials";

export interface IAuthService {    

    getAntiForgeryDataAsync(): Promise<IAntiForgeryData>;

    getAuthStatusAsync(antiForgeryData: IAntiForgeryData): Promise<{ isAuthenticated: boolean; }>;

    authenticateAsync(credentials: IAuthCredentials, antiForgeryData: IAntiForgeryData): Promise<string>;

    logout(): Promise<{ isAuthenticated: boolean; }>;
}