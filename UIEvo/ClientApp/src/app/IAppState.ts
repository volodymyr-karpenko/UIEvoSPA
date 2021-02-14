import { PortfolioSlice } from "../features/portfolio/PortfolioSlice";
import { IPortfolioState } from "../features/portfolio/IPortfolioState";
import { CookieSlice } from "../features/cookie/CookieSlice";
import { ICookieState } from "../features/cookie/ICookieState";
import { NavigationSlice } from "../features/navigation/NavigationSlice";
import { INavigationState } from "../features/navigation/INavigationState";
import { AdminSlice } from "../features/admin/AdminSlice";
import { IAdminState } from "../features/admin/IAdminState";

export interface IAppState {

    [PortfolioSlice.name]: IPortfolioState;

    [CookieSlice.name]: ICookieState;

    [NavigationSlice.name]: INavigationState;

    [AdminSlice.name]: IAdminState;
}