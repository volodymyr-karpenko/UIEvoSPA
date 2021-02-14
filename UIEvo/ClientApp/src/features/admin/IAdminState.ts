import { IAntiForgeryData } from "../../services/auth/IAntiForgeryData";

export interface IAdminState {

    isAuthenticated: boolean;

    antiForgeryData: IAntiForgeryData;
}