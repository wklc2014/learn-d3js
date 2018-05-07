import React from 'react';
import { Router, Route, Switch } from 'mirrorx';

import Demo_01 from '../Demo/Demo_01.jsx';

function App (props) {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ Demo_01 } />
      </Switch>
    </Router>
  )
};

export default App;
