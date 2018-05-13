import React from 'react';
import { render } from 'mirrorx';
import registerServiceWorker from './registerServiceWorker.js';
import App from './App.jsx';

render(<App />, document.getElementById('root'));
registerServiceWorker();
