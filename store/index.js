import { applyMiddleware, createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// create a makeStore function, and pass in middleware
// export const makeStore = (context) => {
//   const sagaMiddleware = createSagaMiddleware();
//   const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

//   store.runSaga = () => {
//     // Avoid running twice
//     if (store.saga) return;
//     store.saga = sagaMiddleware.run(rootSaga);
//   };

//   store.stopSaga = async () => {
//     // Avoid running twice
//     if (!store.saga) return;
//     store.dispatch(END);
//     await store.saga.done;
//     store.saga = null;
//   };

//   store.execSagaTasks = async (isServer, task) => {
//     // run saga
//     store.runSaga();
//     // dispatch saga tasks
//     store.dispatch(task);
//     // Stop running and wait for the tasks to be done
//     await store.stopSaga();
//     // Re-run on client side
//     if (!isServer) {
//       store.runSaga();
//     }
//   };

//   // Initial run
//   store.runSaga();

//   return store;
// };

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
