import './App.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AboutPage from './pages/AboutPage';
import AddMemoryPage from './pages/AddMemoryPage';
import BondRequestsPage from './pages/BondRequestsPage';
import LandingPage from './pages/LandingPage';
import LoadingOverlay from 'react-loading-overlay';
import LoginPage from './pages/LoginPage';
import MemolinePage from './pages/MemolinePage';
import MyPeoplePage from './pages/MyPeoplePage';
import NavBar from './component/NavBar/NavBar';
import PageNotFound from './pages/404';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import React from 'react';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import SessionLogin from './component/SessionLogin/SessionLogin';
import { connect } from 'react-redux';
import { isLoading } from './selectors';
import { setLoading } from './actions';

function App(props) {
  return (
    < div id="App" >
      < LoadingOverlay active={props.isLoading} spinner text="Loading..." >
        <Router>
          <Route render={({ location }) => (
            <div id="app-container">
              <header>
                <NavBar></NavBar>
              </header>
              <section id='main-container'>
                {/* component for session login */}
                <SessionLogin />
                <TransitionGroup id="router-transition-group">
                  <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                  >
                    <Switch location={location}>
                      <Route path="/" exact component={LandingPage}></Route>
                      <Route path="/login" component={LoginPage}></Route>
                      <Route path="/register" component={RegisterPage}></Route>
                      <Route path="/memoline" component={MemolinePage}></Route>
                      <Route path="/profile/:profileUsername" component={ProfilePage}></Route>
                      <Route path="/about" component={AboutPage}></Route>
                      <Route path="/add-memory" component={AddMemoryPage}></Route>
                      <Route path="/my-people" component={MyPeoplePage}></Route>
                      <Route path="/bond-requests" component={BondRequestsPage}></Route>
                      <Route path="/search/:query" component={SearchPage}></Route>
                      <Route path="" component={PageNotFound}></Route>
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </section>
            </div>
          )} />
        </Router>
      </LoadingOverlay >
    </div >
  );
}

const mapStateToProps = state => {
  let loading = isLoading(state);
  return { isLoading: loading };
}

export default connect(mapStateToProps, { setLoading })(App);
