import React from 'react';
import { Router, Route, Switch } from 'mirrorx';

import MyBarChart from './MyBarChart.jsx';
import MyBrokenLineChart from './MyBrokenLineChart.jsx';

import MainLayout from '../MainLayout/Index.jsx';

import MyAxis from '../MyAxis/MyAxis.jsx';
import MyColor from '../MyColor/MyColor.jsx';
import MyPie from '../MyPie/MyPie.jsx';
import MyForce from '../MyForce/MyForce.jsx';

function App(props) {
  return (
    <Router>
      <Switch>
        <MainLayout>
          <Route path="/bar-chart" component={ MyBarChart } />
          <Route path="/line-chart" component={ MyBrokenLineChart } />
          <Route path="/axis" component={ MyAxis } />
          <Route path="/color" component={ MyColor } />
          <Route path="/layout/pie" component={ MyPie } />
          <Route path="/layout/force" component={ MyForce } />
        </MainLayout>
      </Switch>
    </Router>
  )
}

export default App;
