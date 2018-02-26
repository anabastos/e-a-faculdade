import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import App from './App';
import Answer from './Answer';
import Form from './Form';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
    <Router>
        <App>
            <Route exact={true} path="/" component={Form} />
        </App>
    </Router>, 
    document.getElementById('root')
    );
registerServiceWorker();

// <Route 
// path="/answer"
// render={(props) => <Answer {...props} />}
// />