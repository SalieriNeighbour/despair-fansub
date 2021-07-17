import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
// import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import AdminLogin from './components/pages/AdminLogin';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import NovoPost from './components/pages/NovoPost';

// For setting up context
import AuthState from './context/auth/authState';

function App() {
  return (
    <AuthState>
      <Router>
        <Switch>
          <Route component={Contato} exact path="/contato" />
          <Route component={NovoPost} exact path="/novopost" />
          {/* TODO: Make Private ^^ */}
          <Route component={AdminLogin} ex  act path="/adminlogin" />
          <Route component={Home} exact path="/" />
        </Switch>
      </Router>
    </AuthState>
  );
}

export default App;
