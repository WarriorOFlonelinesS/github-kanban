import { createSlice } from '@reduxjs/toolkit';
import { createSelector, Selector } from 'reselect';


const issuesSlice = createSlice({
  name: 'issues',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchIssuesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIssuesSuccess: (state, action) => {
      state.loading = false;
      state.issues = action.payload;
    },
    fetchIssuesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchIssuesRequest, fetchIssuesSuccess, fetchIssuesFailure } = issuesSlice.actions;

export const selectIssuesState = (state) => state.issues;

export const selectIssues = createSelector(selectIssuesState, (issuesState) => issuesState.issues);


export default issuesSlice.reducer;
