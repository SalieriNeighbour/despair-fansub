import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'

// Pages
import AdminLogin from './components/pages/AdminLogin';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';

// For setting up context
import AuthState from './context/auth/authState';

function App() {
  return (
    <AuthState>
      <Router>
        <Switch>
          <Route component={Contato} exact path="/contato" />
          <Route component={AdminLogin} exact path="/adminlogin" />
          <Route component={Home} exact path="/" />
        </Switch>
      </Router>
    </AuthState>
  );
}

export default App;
