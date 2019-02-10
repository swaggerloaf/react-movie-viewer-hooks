import '@babel/polyfill';
import * as React from 'react';
import { render } from 'react-dom';
import * as styles from './styles';
import App from './components/App.jsx';

render(<App />, document.getElementById('mountNode'));
