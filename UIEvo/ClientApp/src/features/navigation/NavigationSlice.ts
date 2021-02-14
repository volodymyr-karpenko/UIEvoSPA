import { createSlice } from "@reduxjs/toolkit";
import { INavigationState } from "./INavigationState";

export const initialState: INavigationState = {
    videoTitle: "home",
    isNavigationCollapsed: true,
    videoRes: "360",
    isVideoLoaded: false
};

export const NavigationSlice = createSlice({
    name: "navigation",
    initialState: initialState,
    reducers: {
        setVideoTitle(state: INavigationState = initialState, action: { type: string; payload: string; }) {
            state.videoTitle = action.payload;
        },
        toggleNavigation(state: INavigationState = initialState, action: { type: string; payload: boolean; }) {
            state.isNavigationCollapsed = action.payload;
        },
        setVideoRes(state: INavigationState = initialState, action: { type: string; payload: string; }) {
            state.videoRes = action.payload;
            state.isVideoLoaded = false;
        },
        toggleVideoLoaded(state: INavigationState = initialState, action: { type: string; payload: boolean; }) {
            state.isVideoLoaded = action.payload;
        }
    }
});