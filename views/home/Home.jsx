import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';
//import TaskList from '../task/TaskList';
import TasksOverviews from '../task/TasksOverviews';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: null
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin() {
    axios.get('/api/currentUser')
      .then((response) => {
        if (response.status===200) {
          this.setState({current_user: response.data});
          console.log(response)
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status===401) {
          window.location.href = '#/login';
        }
      });
  }
  
  render() {
    return (
      <div>
          <Announcements/>
          <TasksOverviews/>
      </div>
    );
  }
}

export default Home;
