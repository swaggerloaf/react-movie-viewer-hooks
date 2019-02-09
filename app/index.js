import '@babel/polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as styles from './styles';
import App from './components/App.jsx';
import store from './redux/configureStore.js';

render(<App />, document.getElementById('mountNode'));
