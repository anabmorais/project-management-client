import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
   renderAuthLinks() {
    // console.log("navbar: props.loggedInUser -> ", this.props.loggedInUser);
    const {loggedInUser, logoutFbase} = this.props;
    if (!loggedInUser) {
      return (
        // same as using <React.Fragment>
        <>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Log In</Link></li>
        </>
        // same as using </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <li>Welcome, {loggedInUser.email}</li>
          <li><Link to="/" onClick={logoutFbase}>Log Out</Link></li>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <nav className="nav-style">
        <ul>
          {this.renderAuthLinks()}
          <li><Link to="/projects">Projects</Link></li>
      </ul>
      </nav>
    );
  }
}

export default Navbar;