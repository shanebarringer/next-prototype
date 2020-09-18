import { HYDRATE } from 'next-redux-wrapper';
import {
  FETCH_USER_TODOS,
  FETCH_USER_TODOS_SUCCESS,
  FETCH_USER_TODOS_ERROR,
} from '../constants/action-types';

const initialState = {
  data: [],
  error: null,
  isFetching: false,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.todos };
    case FETCH_USER_TODOS:
      return { ...state, isFetching: true };

    case FETCH_USER_TODOS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload.data };

    case FETCH_USER_TODOS_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    default:
      return state;
  }
};

export default todosReducer;
