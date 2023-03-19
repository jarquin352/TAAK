import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';
import TaskList from '../task/TaskList';


class Home extends React.Component {
  render() {
    return (
      <div>
          <Announcements/>
          <TaskList/>
      </div>
    );
  }
}

export default Home;
