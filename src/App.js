import './App.css';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AboutPage from './component/AboutPage';
import AddMemoryPage from './component/AddMemoryPage';
import BondRequestsPage from './component/BondRequestsPage';
import LandingPage from './component/LandingPage';
import LoadingOverlay from 'react-loading-overlay';
import LoginPage from './component/LoginPage';
import MemolinePage from './component/MemolinePage';
import MyPeoplePage from './component/MyPeoplePage';
import NavBar from './component/NavBar/NavBar';
import PageNotFound from './component/404';
import ProfilePage from './component/ProfilePage/ProfilePage';
import React from 'react';
import RegisterPage from './component/RegisterPage';
import SearchPage from './component/SearchPage';
import { connect } from 'react-redux';
import { isLoading } from './selectors';
import { setLoading } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.sessionLogin = this.sessionLogin.bind(this);
  }
  componentDidMount() {
    this.sessionLogin();
  }
  render() {
    return (
      < div id="App" >
        < LoadingOverlay active={this.props.isLoading} spinner text="Loading..." >
          <Router>
            <Route render={({ location }) => (
              <div id="app-container">
                <header>
                  <NavBar></NavBar>
                </header>
                <section id='main-container'>
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
  sessionLogin() {
    // TODO
  }
}

const mapStateToProps = state => {
  let loading = isLoading(state);
  return { isLoading: loading };
}

export default connect(mapStateToProps, { setLoading })(App);
