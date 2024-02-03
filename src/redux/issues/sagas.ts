import { put } from "redux-saga/effects";
import { getAllIssuesSuccess, getAllIssuesFailure } from "./reducer";
import { URLS } from "../../constants";
import { TIssue } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

type TPayload = {
  searchValue: string;
};

export function* getIssuesSaga(action: PayloadAction<TPayload>) {
  const url = action.payload.searchValue;
  const match = url.match(
    /https:\/\/github\.com\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?/
  );
  const repo1 = match ? match[1] : "";
  const repo2 = match ? match[2] : "";
  const repo3 = match ? match[3] : "";

  let apiUrl = `${URLS.getAllIssues}${repo1}`;
  if (repo2) {
    apiUrl += `/${repo2}`;
  }
  if (repo3) {
    apiUrl += `/${repo3}`;
  }
  let issues = "/issues?state=all";

  try {
    // @ts-ignore
    const response = yield fetch(apiUrl + issues);
    // @ts-ignore
    const data: Array<TIssue> = yield response.json();
    yield put(getAllIssuesSuccess({ data }));
  } catch (error) {
    yield put(getAllIssuesFailure());
  }
}
