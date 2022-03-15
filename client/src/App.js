import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css'
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import AdminLogin from './components/pages/AdminLogin';
import Home from './components/pages/Home';
import FAQ from './components/pages/FAQ';
import Doar from './components/pages/Doar';
import Contato from './components/pages/Contato';
import NovoPost from './components/pages/NovoPost';
import EditPost from './components/pages/EditPost';
import NotFound from './components/pages/NotFound';
import BrowsingProjects from './components/pages/BrowsingProjects';
import NovoProjeto from './components/pages/NovoProjeto';
import EditProject from './components/pages/EditProject';

import Post from './components/pages/Post';
import BrowsingPage from './components/pages/BrowsingPage';
import TagPage from './components/pages/TagPage';
import ProjectPage from './components/pages/ProjectPage';

// For setting up context
import AuthState from './context/auth/authState';
import ProjectState from './context/project/projectState';
import PostState from './context/post/postState';
import TagsState from './context/tags/tagsState';
import ContactState from './context/contact/contactState';

function App() {
  return (
    <AuthState>
      <ProjectState>
        <PostState>
          <TagsState>
            <ContactState>
              <Router>
                <Switch>
                  <PrivateRoute component={NovoPost} exact path="/novopost" />
                  <PrivateRoute component={EditPost} path="/post/edit/:post_id" />
                  <PrivateRoute component={NovoProjeto} exact path="/novoprojeto" />
                  <PrivateRoute component={EditProject} path="/project/edit/:project_id" />
                  <Route component={AdminLogin} exact path="/adminlogin" />
                  <Route component={BrowsingProjects} exact path="/browsingprojects/:project_status" />
                  <Route component={Home} exact path="/" />
                  <Route component={FAQ} exact path="/perguntas-frequentes" />
                  <Route component={Doar} exact path="/doar" />
                  <Route component={Contato} exact path="/contato" />
                  <Route component={Post} path="/post/:post_id" />
                  <Route component={BrowsingPage} path="/page/:page_id" />
                  <Route component={ProjectPage} path="/project/:project_id/:project_title" />
                  <Route component={TagPage} path="/tag/:tag_id" />
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </ContactState>
          </TagsState>
        </PostState>
      </ProjectState>
    </AuthState>
  );
}

export default App;
