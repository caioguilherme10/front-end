import React, { Component } from 'react';
// logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route } from 'react-router-dom';

import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Principal from './pages/Principal';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Login}/>
          <Route exact path="/Cadastro" component={Cadastro}/>
          <Route exact path="/Principal" component={Principal}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
