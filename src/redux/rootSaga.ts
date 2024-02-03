// sagas.js
import { all, takeLatest } from "redux-saga/effects";
import { getIssuesSaga } from "./issues/sagas";
import { getAllIssuesRequest } from "./issues/reducer";

export function* rootSaga() {
  yield all([takeLatest(getAllIssuesRequest.type, getIssuesSaga)]);
}

export default rootSaga;
