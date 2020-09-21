import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { groupBy } from 'lodash';
import { fetchUserTodos } from '../../../actions';
import { wrapper } from '../../../store';
import TodoPieChart from '../../../components/TodoPieChart';

import styles from '../../../styles/Home.module.css';

const Todos = ({ data }) => {
  const router = useRouter();

  // get ID from URL param /users/[id]/todos
  const { id } = router.query;

  // lookup user in state via ID
  const user = useSelector((state) =>
    state.users.data.find((u) => u.id === parseInt(id, 10))
  );

  // create two arrays (complete/incomplete tasks) from larger list of todos
  const { true: complete, false: incomplete } = groupBy(data, 'completed');

  return (
    <main className={styles.main}>
      <h3 className={styles.title}>Todos for {user?.name}</h3>
      <TodoPieChart complete={complete} incomplete={incomplete} />
    </main>
  );
};

//
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, params }) => {
    if (!store.getState().todos.data?.length) {
      store.dispatch(fetchUserTodos(params.id));
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
    const { data } = store.getState().todos;
    return { props: { data } };
  }
);

export default Todos;
