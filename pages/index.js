import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

const Index = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Epi Next Prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>NextUP</h1>
        <p>Click a link to get started</p>
        <div className={styles.grid}>
          <div className={styles.card} styles={{ width: '40%' }}>
            <Link href="/users" prefetch>
              Users - meet our team
            </Link>
          </div>
          <div className={styles.card} styles={{ width: '40%' }}>
            <Link href="/blogs" prefetch>
              Blogs - our latest work
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Index;
