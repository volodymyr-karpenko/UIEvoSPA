import { createSlice } from "@reduxjs/toolkit";
import { ICookieState } from "./ICookieState";

const initialState: ICookieState = { isModalCollapsed: true, isConsentCollapsed: true };

export const CookieSlice = createSlice({
    name: "cookie",
    initialState: initialState,
    reducers: {
        toggleModal: (state: ICookieState = initialState, action: { type: string; payload: boolean; }) => {
            state.isModalCollapsed = action.payload
        },
        toggleConsent: (state: ICookieState = initialState, action: { type: string; payload: boolean; }) => {
            state.isConsentCollapsed = action.payload;
        }
    }
});