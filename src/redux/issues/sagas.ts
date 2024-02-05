import { call, put } from "redux-saga/effects";
import {
  getAllIssuesSuccess,
  getAllIssuesFailure,
  getRepoInfoSuccess,
} from "./reducer";

import { TIssue, TRepoInfoSuccess } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { getGitHubApi } from "./helpers/getGitHubApi";
import { getGitHubApiIssues } from "./helpers/getGitHubIssues";

export type TPayload = {
  searchValue: string;
};

export function* getIssuesSaga(action: PayloadAction<TPayload>) {
  try {
    // @ts-ignore
    const apiUrlIssues = yield call(getGitHubApiIssues, action);
    // @ts-ignore
    const apiUrl = yield call(getGitHubApi, action);
    // @ts-ignore
    const issuesResponse = yield fetch(apiUrlIssues);
    // @ts-ignore
    const repoResponse = yield fetch(apiUrl);

    const issues: Array<TIssue> = yield issuesResponse.json();
    const repoInfo: TRepoInfoSuccess = yield repoResponse.json();
    yield put(getAllIssuesSuccess({ data: issues }));
    yield put(
      getRepoInfoSuccess({
        ...repoInfo,
      })
    );
  } catch (error) {
    yield put(getAllIssuesFailure());
  }
}
