import * as React from "react";
import { IAuthService } from "./IAuthService";
import AuthService from "./AuthService";

export const AuthServiceDefault: IAuthService = new AuthService();
export const AuthServiceContext = React.createContext<IAuthService>(AuthServiceDefault);