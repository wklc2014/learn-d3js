import React from 'react';
import { render } from 'mirrorx';
import App from './pages/App/App.jsx';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));

registerServiceWorker();
