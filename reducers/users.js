import { HYDRATE } from 'next-redux-wrapper';
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
} from '../constants/action-types';

const initialState = {
  data: [],
  error: null,
  isFetching: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if (state.data.length) {
        nextState.data = state.data;

        return nextState;
      }
      return { ...state, ...action.payload.users };
    case FETCH_USERS:
      return { ...state, isFetching: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload.data };

    case FETCH_USERS_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    default:
      return state;
  }
};

export default usersReducer;
