import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';
import TaskList from '../task/TaskList';
import PendingTasks from '../task/PendingTasks';
// import SprintTimeline from '../sprint/Sprint';



//main container for all in ./task

class Tasks extends React.Component {
  render() {
    return (
      <div>
          <TaskList/>
          <PendingTasks/>
          {/* <SprintTimeline/> */}
      </div>
    );
  }
}

export default Tasks;
