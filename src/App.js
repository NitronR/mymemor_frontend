import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/NavBar/NavBar'
import LandingPage from './component/LandingPage';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import AboutPage from './component/AboutPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

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
            <Route path="/about" component={AboutPage}></Route>
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
