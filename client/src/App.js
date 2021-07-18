import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
// import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import AdminLogin from './components/pages/AdminLogin';
import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import NovoPost from './components/pages/NovoPost';
import EditPost from './components/pages/EditPost';
import NotFound from './components/pages/NotFound';
import BrowsingProjects from './components/pages/BrowsingProjects';

import Post from './components/pages/Post';
import BrowsingPage from './components/pages/BrowsingPage';
import TagPage from './components/pages/TagPage';

// For setting up context
import AuthState from './context/auth/authState';
import PostState from './context/post/postState';
import TagsState from './context/tags/tagsState';

function App() {
  return (
    <AuthState>
      <PostState>
        <TagsState>
          <Router>
            <Switch>
              <Route component={Contato} exact path="/contato" />
              <Route component={NovoPost} exact path="/novopost" />
              {/* TODO: Make Private ^^ */}
              <Route component={EditPost} path="/post/edit/:post_id" />
              {/* TODO: Make Private ^^ */}
              <Route component={AdminLogin} exact path="/adminlogin" />
              <Route component={BrowsingProjects} exact path="/browsingprojects/:project_status" />
              <Route component={Home} exact path="/" />
              <Route component={Post} path="/post/:post_id" />
              <Route component={BrowsingPage} path="/page/:page_id" />
              <Route component={TagPage} path="/tag/:tag_id" />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </TagsState>
      </PostState>
    </AuthState>
  );
}

export default App;
