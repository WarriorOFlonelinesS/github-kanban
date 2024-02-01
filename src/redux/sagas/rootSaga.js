import { takeEvery } from "redux-saga/effects";
import {GET_ISSUES} from "../features/actions";
import {getIssuesSaga} from "./sagas";

export function* rootSaga() {
    yield takeEvery(GET_ISSUES, getIssuesSaga);
  }