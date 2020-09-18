import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as actionTypes from '../constants/action-types';

// const getStateValue = (state) => state.client.getStateValue;

function* fetchUsers() {
  try {
    const data = yield fetch(
      'https://jsonplaceholder.typicode.com/users'
    ).then((res) => res.json());

    yield put(actions.fetchUsersSuccess(data));
  } catch (error) {
    yield put(
      actions.fetchUsersError({
        message: error.toString(),
      })
    );
  }
}

function* fetchUserTodos(action) {
  try {
    const data = yield fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${action.payload.userId}`
    ).then((res) => res.json());

    yield put(actions.fetchUserTodosSuccess(data));
  } catch (error) {
    yield put(
      actions.fetchUserTodosError({
        message: error.toString(),
      })
    );
  }
}

function* fetchAllBlogs() {
  try {
    const data = yield fetch(
      'https://jsonplaceholder.typicode.com/posts'
    ).then((res) => res.json());

    yield put(actions.fetchAllBlogsSuccess(data));
  } catch (error) {
    yield put(
      actions.fetchAllBlogsError({
        message: error.toString(),
      })
    );
  }
}

// Watchers
function* watchFetchUsers() {
  yield takeLatest(actionTypes.FETCH_USERS, fetchUsers);
}

function* watchFetchUserTodos() {
  yield takeLatest(actionTypes.FETCH_USER_TODOS, fetchUserTodos);
}

function* watchFetchAllBlogs() {
  yield takeLatest(actionTypes.FETCH_All_BLOGS, fetchAllBlogs);
}

function* rootSaga() {
  yield all([watchFetchUsers(), watchFetchUserTodos(), watchFetchAllBlogs()]);
}

export default rootSaga;
