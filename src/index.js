import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ThreeJSApp from './three/main';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

ThreeJSApp();
