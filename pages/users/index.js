import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { fetchUsers } from '../../actions';
import { wrapper } from '../../store';

import styles from '../../styles/Home.module.css';

const Users = () => {
  const { users } = useSelector((state) => ({ users: state.users }));

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Select a user</h1>
      <div className={styles.grid}>
        {users.data.map((user) => (
          <div className={styles.card} key={user.id}>
            <p>{user.name}</p>
            <Link href="/users/[id]/todos" as={`/users/${user.id}/todos`}>
              todos
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (!store.getState().users.data?.length) {
    store.dispatch(fetchUsers());
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
});

export default Users;
