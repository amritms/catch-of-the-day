import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';

import {BrowserRouter, Route, Switch } from 'react-router-dom'

import StorePicker from './components/StorePicker.js'
import App from './components/App'
import NotFound from './components/NotFound'

const Root = () => {
    return (
        <main>
    <Switch>
      <Route exact path='/' component={StorePicker}/>
      <Route path='/store/:storeId' render={(props) => <App {...props} />}/>
      <Route component={NotFound}/>
    </Switch>
  </main>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <Root  />
    </BrowserRouter>
    , document.getElementById('main'));
