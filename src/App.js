import React from 'react';
import './App.css';
import NavBar from './component/NavBar/NavBar'
import LandingPage from './component/LandingPage';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import MemolinePage from './component/MemolinePage';
import AboutPage from './component/AboutPage';
import AddMemoryPage from './component/AddMemoryPage';
import MyPeoplePage from './component/MyPeoplePage';
import SearchPage from './component/SearchPage';
import PageNotFound from './component/404';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProfilePage from './component/ProfilePage/ProfilePage';

function App() {
  return (
    <div id="App">
      <Router>
        <header>
          <NavBar></NavBar>
        </header>
        <section id='main-container'>
          <Switch>
            <Route path="/" exact component={LandingPage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/memoline" component={MemolinePage}></Route>
            <Route path="/profile" component={ProfilePage}></Route>
            <Route path="/about" component={AboutPage}></Route>
            <Route path="/add-memory" component={AddMemoryPage}></Route>
            <Route path="/my-people" component={MyPeoplePage}></Route>
            <Route path="/search" component={SearchPage}></Route>
            <Route path="" component={PageNotFound}></Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
