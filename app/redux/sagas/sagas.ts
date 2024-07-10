import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchIssuesRequest, fetchIssuesSuccess, fetchIssuesFailure } from './issuesSlice';

function* fetchUserSaga() {
  try {
    const response = yield call(
      axios.get,
      `https://api.github.com/repos/octocat/Hello-World/issues`
    );
    yield put(fetchIssuesSuccess(response.data));
  } catch (error) {
    yield put(fetchIssuesFailure(error.message));
  }
}

function* rootSaga() {
  yield takeLatest(fetchIssuesRequest.type, fetchUserSaga);
}

export default rootSaga;
