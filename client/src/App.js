import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Page from 'containers/Page/Page';

import 'App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Page}/>
      </Switch>
    </Router>
  );
}

export default App;
