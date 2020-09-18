import { combineReducers, createStore } from 'redux';
import usersReducer from './users';
import todosReducer from './todos';
import blogsReducer from './blogs';

const rootReducer = combineReducers({
  users: usersReducer,
  todos: todosReducer,
  blogs: blogsReducer,
});

export default rootReducer;
