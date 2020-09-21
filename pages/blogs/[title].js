import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { kebabCase } from 'lodash';
import { fetchAllBlogs } from '../../actions';
import { wrapper } from '../../store';
import Content from '../../components/Content';

import styles from '../../styles/Home.module.css';

const BlogPost = ({ data }) => {
  const router = useRouter();
  const { title } = router.query;
  const blog = data?.find((d) => kebabCase(d.title) === title);

  if (!blog) {
    return <main className={styles.main}> fetching data</main>;
  }

  return (
    <main className={styles.main} style={{ maxWidth: '50%', margin: '0 auto' }}>
      <Content blog={blog} styles={styles} />
    </main>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { title: 'title-format-example' } },
      { params: { title: '/qui-est-esse' } },
    ],
    fallback: true,
  };
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (!store.getState().blogs.data?.length) {
    store.dispatch(fetchAllBlogs());
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
  const { data } = store.getState().blogs;

  return { props: { data } };
});

export default BlogPost;
