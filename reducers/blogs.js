import { HYDRATE } from 'next-redux-wrapper';
import {
  FETCH_All_BLOGS,
  FETCH_All_BLOGS_SUCCESS,
  FETCH_All_BLOGS_ERROR,
} from '../constants/action-types';

const initialState = {
  data: [],
  error: null,
  isFetching: false,
};

const blogsReducer = (state = initialState, action) => {
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
      return { ...state, ...action.payload.blogs };
    case FETCH_All_BLOGS:
      return { ...state, isFetching: true };
    case FETCH_All_BLOGS_SUCCESS:
      return { ...state, isFetching: false, data: action.payload.data };

    case FETCH_All_BLOGS_ERROR:
      return { ...state, isFetching: false, error: action.payload.error };
    default:
      return state;
  }
};

export default blogsReducer;
