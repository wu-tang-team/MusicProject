import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import modal from './pages/modal';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignUp from './components/Signup';
import Login from './components/Login';
import addSongs from './components/addSongs';
import Update from './pages/update';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} /> 
          <Route path="/about" component={About} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />  
          <Route path="/addSongs" component={addSongs} /> 
          <Route path="/modal" component={modal} />        
          <Route path="/signUp" component={SignUp} />
          <Route path="/update" component={Update} />

        </div>
      </Router>
      
    );
  }
}

export default App;
