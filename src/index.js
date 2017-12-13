import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import background from './background.jpg';

injectGlobal`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background-color: #5f6c72;
  }

  #root {
    height: 100%;
  }

  .App {
    height: 100%;
  }

  .container {
    height: 100%;
  }

  .row {
    height: 100%;
  }

  .col-sm-10 {
    height:100%;
  }
  .col-sm-6 {
    height: 100%
  }
`;

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
