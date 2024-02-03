import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGetAllIssuesSuccess, TIssuesState } from "./types";

const initialState: TIssuesState = {
  toDo: [],
  inProgress: [],
  closed: [],
  isLoading: false,
  openIssues: [],
  allIssues: [],
  closedIssues: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    getAllIssuesRequest: (state, action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    getAllIssuesSuccess: (
      state,
      action: PayloadAction<TGetAllIssuesSuccess>
    ) => {
      state.toDo = action.payload.data.filter(
        (issue) => issue.state === "open" && !issue.assignee
      );
      state.inProgress = action.payload.data.filter(
        (issue) => issue.state === "open" && issue.assignee
      );
      state.closed = action.payload.data.filter(
        (issue) => issue.state === "closed"
      );
      state.isLoading = false;
    },
    getAllIssuesFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getAllIssuesRequest, getAllIssuesSuccess, getAllIssuesFailure } =
  issuesSlice.actions;

export default issuesSlice.reducer;
