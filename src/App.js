import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import firebase from "firebase";

import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

class App extends Component {
  constructor(props) {
    super(props);
    // when loggedInUser is set from FireBase Auth,
    // it will be an object with lots of keys, two useful ones
    // we can use are: loggedInUser.uid and loggedInUser.email :)
    this.state = { 
      loggedInUser: null,
      jwt: '',
     };
  }

  componentDidMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAhqTf_Kf-lzT3gOVyrw5d41x8MDTSI1Xo",
      authDomain: "myfirstfirebaseproject-d5f4b.firebaseapp.com",
      databaseURL: "https://myfirstfirebaseproject-d5f4b.firebaseio.com",
      projectId: "myfirstfirebaseproject-d5f4b",
      storageBucket: "myfirstfirebaseproject-d5f4b.appspot.com",
      messagingSenderId: "944941122227",
      appId: "1:944941122227:web:64692e7f9f103c92bc26c6",
      measurementId: "G-Y3GX04E0P1"
    });

    const loggedInUser = JSON.parse(window.sessionStorage.getItem('fbaseUser'));
    const jwt = window.sessionStorage.getItem('fbaseJwt');
    if (loggedInUser && jwt && !this.state.loggedInUser) {
      this.setState({loggedInUser, jwt});
    }

  }

  getJWT(user) {
    user.getIdToken()
    .then(resp => {
      this.setState({jwt: resp});
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
      window.sessionStorage.setItem('fbaseUser', JSON.stringify(user));
      window.sessionStorage.setItem('fbaseJwt', resp);
    })
    .catch(err => console.log(err));
  }

  createNewFbaseUser = (email, password, callbackNavToProj) => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(resp => {
      // console.log(resp);
      this.setState({loggedInUser: resp.user});
      this.getJWT(resp.user);
      callbackNavToProj();
    })
    .catch(err => alert(err));
  }


    loginFbaseUser = (email, password, callbackNavToProj) => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(resp => {
      console.log(resp);
      this.setState({loggedInUser: resp.user});
      this.getJWT(resp.user);
      callbackNavToProj();
    })
    .catch(err => alert(err));
  }

  logoutFbaseUser = () => {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sign-out
    firebase.auth().signOut()
    .then(() => {
      // console.log("User has been logged out");
      this.setState({loggedInUser: null, jwt: ''});
      window.sessionStorage.removeItem('fbaseUser');
      window.sessionStorage.removeItem('fbaseJwt');
    })
    .catch(err => alert(err));
  }

  render() {
    const {loggedInUser, jwt} = this.state;
    const uid = loggedInUser ? loggedInUser.uid : null;
    return (
      <div className="App">
       <Navbar loggedInUser={loggedInUser} logoutFbase={this.logoutFbaseUser} />
        <Switch>
          <Route exact path='/signup' render={(props) => <Signup createNewFbaseUser={this.createNewFbaseUser} {...props} />} />
          <Route exact path='/login' render={(props) => <Login loginFbaseUser={this.loginFbaseUser} {...props} />} />
          <Route exact path="/projects" render={(props) => <ProjectList uid={uid} jwt={jwt} {...props}/>} />
          <Route exact path="/projects/:id" render={(props) => <ProjectDetails uid={uid} {...props}/>} />
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;


