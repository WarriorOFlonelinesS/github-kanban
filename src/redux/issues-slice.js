import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allIssues: [],
  openIssues: [],
  closedIssues: [],
  status: null,
  error: null,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    getAllIssuesSuccess: (state, action) => {
      state.status = "succeeded";
      state.allIssues = [...action.payload];
      state.openIssues = [
        ...action.payload.filter((issue) => issue.state === "open"),
      ];
      state.closedIssues = [
        ...action.payload.filter((issue) => issue.state === "closed"),
      ];
    },
    getIssuesFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { getAllIssuesSuccess, getOpenIssuesSuccess, getIssuesFailure } =
  issuesSlice.actions;

export default issuesSlice.reducer;
