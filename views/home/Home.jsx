import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';
//import TaskList from '../task/TaskList';
import TasksOverviews from '../task/TasksOverviews';

class Home extends React.Component {
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
