import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from '../services/store';
import Router from '../routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store()}>
        <HashRouter>
          <Router />
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
