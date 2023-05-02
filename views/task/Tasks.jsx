import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';
import TaskList from '../task/TaskList';
import PendingTasks from '../task/PendingTasks';
import axios from 'axios';
class Tasks extends React.Component {
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
          <TaskList/>
          <PendingTasks/>
      </div>
    );
  }
}

export default Tasks;
