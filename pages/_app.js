import React from 'react';
import { wrapper } from '../store';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(App);
