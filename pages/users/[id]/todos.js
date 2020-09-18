import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { PieChart, Pie, Tooltip } from 'recharts';
import { groupBy } from 'lodash';
import { fetchUserTodos } from '../../../actions';
import { wrapper } from '../../../store';
import styles from '../../../styles/Home.module.css';

const Todos = ({ data }) => {
  const router = useRouter();

  const { id } = router.query;

  const user = useSelector((state) =>
    state.users.data.find((u) => u.id === parseInt(id, 10))
  );

  const { true: complete, false: incomplete } = groupBy(data, 'completed');

  return (
    <main className={styles.main}>
      <h3 className={styles.title}>Todos for {user.name}</h3>

      <PieChart
        width={500}
        height={500}
        margin={{
          top: 5,
          right: 20,
          left: 30,
          bottom: 5,
        }}
      >
        <Pie
          isAnimationActive={false}
          data={complete}
          cx={200}
          cy={200}
          outerRadius={60}
          fill="#8884d8"
          dataKey="id"
          keyField="title"
        />
        <Pie
          isAnimationActive={false}
          data={incomplete}
          cx={200}
          cy={200}
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          dataKey="id"
          keyField="title"
          label={(entry) => entry.title}
        />
      </PieChart>
    </main>
  );
};

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
