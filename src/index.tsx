import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// @ts-expect-error ts-migrate(6142) FIXME: Module './components/App' was resolved to '/home/e... Remove this comment to see the full error message
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
