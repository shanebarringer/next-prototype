import React from 'react';

const Content = ({ blog, styles }) => (
  <div>
    <h3 className={styles.title}>{blog.title}</h3>
    <p>{blog.body}</p>
  </div>
);

export default Content;
