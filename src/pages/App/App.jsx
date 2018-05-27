import React from 'react';
import { Router, Route, Switch } from 'mirrorx';

import MainLayout from '../MainLayout/Index.jsx';

import MyAxis from '../MyAxis/MyAxis.jsx';
import MyColor from '../MyColor/MyColor.jsx';
import MyPie from '../MyPie/MyPie.jsx';

function App(props) {
  return (
    <Router>
      <Switch>
        <MainLayout>
          <Route path="/axis" component={ MyAxis } />
          <Route path="/color" component={ MyColor } />
          <Route path="/layout/pie" component={ MyPie } />
        </MainLayout>
      </Switch>
    </Router>
  )
}

export default App;
