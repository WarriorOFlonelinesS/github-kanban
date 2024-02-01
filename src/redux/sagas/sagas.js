import { put } from "redux-saga/effects";
import { getIssuesSuccess } from "../issues-slice";

export function* getIssuesSaga() {
    const respon = yield  fetch( ' https://api.github.com/repos/facebook/react/issues?state=all');
    const issues =  yield respon.json()
    yield put(getIssuesSuccess(issues))
  }