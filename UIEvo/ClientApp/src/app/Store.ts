import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { PortfolioSlice } from "../features/portfolio/PortfolioSlice";
import { CookieSlice } from "../features/cookie/CookieSlice";
import { NavigationSlice } from "../features/navigation/NavigationSlice";
import { AdminSlice } from "../features/admin/AdminSlice";

const rootReducer = combineReducers({
    [PortfolioSlice.name]: PortfolioSlice.reducer,
    [CookieSlice.name]: CookieSlice.reducer,
    [NavigationSlice.name]: NavigationSlice.reducer,
    [AdminSlice.name]: AdminSlice.reducer
});

export const Store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()]
});