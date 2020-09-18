import * as actionTypes from '../constants/action-types';

export const fetchUsers = () => ({
  type: actionTypes.FETCH_USERS,
});

export const fetchUsersSuccess = (data) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  payload: { data },
});

export const fetchUsersError = ({ message }) => ({
  type: actionTypes.FETCH_USERS_ERROR,
  payload: { error: message },
});

export const fetchUserTodos = (userId) => ({
  type: actionTypes.FETCH_USER_TODOS,
  payload: { userId },
});

export const fetchUserTodosSuccess = (data) => ({
  type: actionTypes.FETCH_USER_TODOS_SUCCESS,
  payload: { data },
});

export const fetchUserTodosError = ({ message }) => ({
  type: actionTypes.FETCH_USER_TODOS_ERROR,
  payload: { error: message },
});

export const fetchAllBlogs = () => ({
  type: actionTypes.FETCH_All_BLOGS,
});

export const fetchAllBlogsSuccess = (data) => ({
  type: actionTypes.FETCH_All_BLOGS_SUCCESS,
  payload: { data },
});

export const fetchAllBlogsError = ({ message }) => ({
  type: actionTypes.FETCH_All_BLOGS_ERROR,
  payload: { error: message },
});
