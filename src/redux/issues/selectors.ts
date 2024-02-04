import { createSelector } from 'reselect';
import {RootState} from "../store";

export const getState = (state: RootState) => state.issues;

export const getAllIssues = createSelector(
    getState,
    data => ({ 0: data.toDo, 1: data.inProgress, 2: data.closed }),
);

export const getIsLoading = createSelector(
    getState,
    data => data.isLoading,
);
export const getRepoInfo = createSelector(
    getState,
    data => data.repoInfo?.data,
);