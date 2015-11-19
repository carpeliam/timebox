import 'babel-polyfill';

import 'ratchet/sass/ratchet.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './Main';

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
