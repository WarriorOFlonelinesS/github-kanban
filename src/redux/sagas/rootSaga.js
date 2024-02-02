import { takeEvery } from "redux-saga/effects";
import { GET_ALL_ISSUES } from "../features/actions";
import { getAllIssuesSaga } from "./sagas";

export function* rootSaga() {
  yield takeEvery(GET_ALL_ISSUES, getAllIssuesSaga);
}
