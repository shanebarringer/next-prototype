import React from 'react';
import Link from 'next/link';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { kebabCase } from 'lodash';
import { fetchAllBlogs } from '../../actions';
import { wrapper } from '../../store';

import styles from '../../styles/Home.module.css';

const Blogs = ({ data }) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Latest Articles:</h1>
      <div className={styles.grid}>
        {data.map((blog) => (
          <div className={styles.card} key={blog.id}>
            <Link href="/blogs/[title]" as={`/blogs/${kebabCase(blog.title)}`}>
              {blog.title}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (!store.getState().blogs.data?.length) {
    store.dispatch(fetchAllBlogs());
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
  const { data } = store.getState().blogs;

  return { props: { data } };
});

export default Blogs;
