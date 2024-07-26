import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { TIssue } from '../types';
import { RootState } from './store'; 

interface IssuesState {
  toDo: TIssue[];
  inProgress: TIssue[];
  closed: TIssue[];
  isLoading: boolean;
  openIssues: TIssue[];
  allIssues: TIssue[];
  closedIssues: TIssue[];
  user: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  toDo: [],
  inProgress: [],
  closed: [],
  isLoading: false,
  openIssues: [],
  allIssues: [],
  closedIssues: [],
  user: null,
  loading: false,
  error: null,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    fetchIssuesRequest: (state) => {
      state.loading = true;
      state.error = null;
     },
    fetchIssuesSuccess: (state, action: PayloadAction<{
      filter: Function; data: TIssue[] 
}>) => {
      console.log(action)
      state.toDo = action.payload.filter((issue: TIssue) => issue.state === 'open' && !issue.assignee);
      state.inProgress = action.payload.filter(
        (issue: TIssue) => issue.state === 'open' && issue.assignee
      );
     
      state.closed = action.payload.filter((issue: TIssue) => issue.state === 'closed');
      state.loading = false;
    },
    fetchIssuesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchIssuesRequest, fetchIssuesSuccess, fetchIssuesFailure } = issuesSlice.actions;

export const getState = (state: RootState) => state.issues;

export const selectIssuesState = (state: RootState) => state.issues;

export const selectIsLoading = (state: RootState) => state.issues.loading;

export const selectIssues = createSelector(getState, (data) => ({
  0: data.toDo,
  1: data.inProgress,
  2: data.closed,
}));

export default issuesSlice.reducer;
