import React from 'react';
import { RootContainer } from 'react-relay';
import ReactDOM from 'react-dom';
import App from './App';
import AppRoute from './AppRoute';

ReactDOM.render(
  <RootContainer
    Component={App}
    route={new AppRoute()}
  />,
  document.getElementById('root')
);
