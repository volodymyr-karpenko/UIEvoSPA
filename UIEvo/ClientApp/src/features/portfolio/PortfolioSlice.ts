import { createSlice } from "@reduxjs/toolkit";
import { IPortfolioState } from "./IPortfolioState";
import { IPortfolioPost } from "./IPortfolioPost";

const initialState: IPortfolioState = { portfolioPosts: [] };

export const PortfolioSlice = createSlice({
    name: "portfolio",
    initialState: initialState,
    reducers: {
        setPosts(state: IPortfolioState = initialState, action: { type: string; payload: IPortfolioPost[]; }) {
            state.portfolioPosts = action.payload;
        }
    }
});