import { createSlice } from "@reduxjs/toolkit";
import { IAdminState } from "./IAdminState";
import { IAntiForgeryData } from "../../services/auth/IAntiForgeryData";

const initialState: IAdminState = { isAuthenticated: false, antiForgeryData: { antiForgeryHeader: "", antiForgeryToken: "" } };
export const AdminSlice = createSlice({
    name: "admin",
    initialState: initialState,
    reducers: {
        setIsAuthenticated: (state: IAdminState = initialState, action: { type: string; payload: boolean; }) => {
            state.isAuthenticated = action.payload;
        },
        setAntiForgeryData: (state: IAdminState = initialState, action: { type: string; payload: IAntiForgeryData; }) => {
            state.antiForgeryData = action.payload;
        }
    }
});