import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddProject from './AddProject'; // <== !!!

class ProjectList extends Component {
  constructor(){
      super();
      this.state = { listOfProjects: [] };
  }

  getAllProjects = () =>{
    axios.get(`http://localhost:5000/api/projects`)
    .then(responseFromApi => {
      this.setState({
        listOfProjects: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllProjects();
  }

  render() {
    const arrayOfProjectDivs = this.state.listOfProjects.map( project => {
      return (
        <div key={project._id}>
          <Link to={`/projects/${project._id}`}>
            <h3>{project.title}</h3>
          </Link>
          {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
        </div>
      );
    });

    const addProjectComponent = <AddProject jwt={this.props.jwt} getData={() => this.getAllProjects()}/>;

    return (
      <div>
        <div style={{width: '60%', float:"left"}}>
          {arrayOfProjectDivs}
        </div>
        <div style={{width: '40%', float:"right"}}>
          {this.props.uid && addProjectComponent}
        </div>
      </div>
    );
  }
}

export default ProjectList;