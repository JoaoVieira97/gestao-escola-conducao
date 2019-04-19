import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// REDUX STORE
import store  from './redux/store';

// Root component
import Root from "./components/Root";


ReactDOM.render(<Root store={store} />, document.getElementById('root'));
serviceWorker.unregister();
