import { put } from "redux-saga/effects";
import { getAllIssuesSuccess, getOpenIssuesSuccess } from "../issues-slice";

export function* getAllIssuesSaga(action) {
  const url = action.payload.searchValue;
  const match = url.match(
    /https:\/\/github\.com\/([^/]+)(?:\/([^/]+))?(?:\/([^/]+))?/
  );
  const repo1 = match ? match[1] : "";
  const repo2 = match ? match[2] : "";
  const repo3 = match ? match[3] : "";

  let apiUrl = `https://api.github.com/repos/${repo1}`;
  if (repo2) {
    apiUrl += `/${repo2}`;
  }
  if (repo3) {
    apiUrl += `/${repo3}`;
  }
  let issues = '/issues?state=all'
  const urlTest = 'https://api.github.com/repos/facebook/react/issues?state=all'

  const response = yield fetch(apiUrl + issues);

  const issuesResult = yield response.json();
  console.log(issuesResult.filter(issue=> issue.state === 'closed'));
  yield put(getAllIssuesSuccess(issuesResult));
}
