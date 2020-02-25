import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    // this.props.history gets defined automatically inside of a <Route />
    // since we have access to history here, but not inside of App.js,
    // we can pass a "callback" function, which defines the function here, to be executed back in App.js
    const callback = () => this.props.history.push('/projects');
    this.props.createNewFbaseUser(email, password, callback);
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />

          <input type="submit" value="Signup" />
        </form>

        <p>Already have account?
            <Link to={"/login"}> Login</Link>
        </p>

      </div>
    );
  }
}

export default Signup;