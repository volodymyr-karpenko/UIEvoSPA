import * as React from "react";
import CookieService from "./CookieService";
import { ICookieService } from "./ICookieService";

export const CookieServiceDefault: ICookieService = new CookieService();
export const CookieServiceContext = React.createContext<ICookieService>(CookieServiceDefault);