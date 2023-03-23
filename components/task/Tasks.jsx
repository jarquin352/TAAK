import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';
import TaskList from '../task/TaskList';
import PendingTasks from '../task/PendingTasks';

//main container for all in ./task

class Tasks extends React.Component {
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
