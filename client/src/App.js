import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'

// Páginas
import AdminLogin from './components/pages/AdminLogin';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route component={Contato} exact path="/contato" />
          <Route component={AdminLogin} exact path="/adminlogin" />
          <Route component={Home} exact path="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
