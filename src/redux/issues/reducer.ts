import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TGetAllIssuesSuccess,
  TIssue,
  TIssuesState,
  TRepoInfoSuccess,
} from "./types";
import { TPayload } from "./sagas";

const initialState: TIssuesState = {
  toDo: [],
  inProgress: [],
  closed: [],
  isLoading: false,
  openIssues: [],
  allIssues: [],
  closedIssues: [],
  repoInfo: null,
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    getAllIssuesRequest: (state, action: PayloadAction<TPayload>) => {
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
    getRepoInfoSuccess: (state, action: PayloadAction<TRepoInfoSuccess>) => {
      state.repoInfo = action.payload;
    },
    getAllIssuesFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getAllIssuesRequest,
  getAllIssuesSuccess,
  getAllIssuesFailure,
  getRepoInfoSuccess,
} = issuesSlice.actions;

export default issuesSlice.reducer;
