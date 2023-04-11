import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TaskSearchBar from './TaskSearchBar';

//front end data
//import {tasks, users, projTeam, Sprints, taskTypes} from './tasksTestData.js'

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLetters: '',
      // tasks:tasks.filter((task) => task.isAssigned),
      // taskTypes: taskTypes
      tasks: window.taakmodels.tasksModel().filter((task)=> task.isAssigned),
      taskTypes: window.taakmodels.taskTypesModel()
    };
  }

  handledragover = event => {
    event.preventDefault();
  };

  handledrop = event => {
    event.preventDefault();
    var task_id = event.dataTransfer.getData("task_id");
    if(event.target.classList.contains('task-list')) {
      event.target.appendChild(document.getElementById(task_id));
    }
  };

  handledrag = event => {
    event.dataTransfer.setData("task_id", event.target.attributes.id.value);
  };

  render() {
    return (
      <Container disableGutters maxWidth="false" sx={{ 
      px:1, 
      py:1, 
      bgcolor: "transparent",
      borderColor: "black",
      borderRadius: 5,
      fontSize: "0.875rem",
      fontWeight: "700" }}>
        <TaskSearchBar value={this.state.inputLetters} />
         <Typography variant="h3" sx={{ textAlign: 'center', my: 3 }}>
          Your Tasks
        </Typography>
        <Container disableGutters maxWidth="ld" component="main">
          {/* <Grid container spacing={2} alignItems="flex-end" > */}
          <Grid container spacing = {2} alighItems = 'flex-end' sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            {this.state.taskTypes?.map(type => (
              //Old grid item that only makes 3 columns....keep for reference
              // <Grid item xs={12} md={4} key={type.name+"-tasks"} className="new-tasks" >
                <Grid item md={2} key={type.name+"-tasks"} className="new-tasks">
                <Card variant="outlined" sx={{ borderRadius:5,mb:1, position: "relative",boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
                  <Typography sx={{mx:'auto', width:200}} variant  = 'h4'>{type.name}</Typography>
                  <Typography sx={{position: "absolute", top: 10, right: 10, height: "10px", width: "10px", borderRadius: 5, bgcolor: type.color}} />
                </Card>
                <Stack
                  id={type.name+"-tasks-stack"}
                  type_id={type._id}
                  droppable="true"
                  onDragOver={this.handledragover}
                  onDrop={this.handledrop}
                  spacing={1}
                  className="task-list"
                  sx={{
                    height: 600,
                    '& div': {
                      borderRightColor: type.color,
                      borderRightWidth: 2
                    }
                  }}
                >
                  {this.state.tasks?.filter(task => task.type_id === parseInt(type._id)).map(task => (
                  <Card
                    key={"task"+task._id}
                    id={"task"+task._id}
                    draggable="true"
                    droppable="false"
                    onDragStart={this.handledrag}
                    variant="outlined"
                    className="task-task"
                    sx={{ 
                      borderRadius: 5, 
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
                      
                    }}
                    
                  >
                    <CardContent>
                      <Typography><h5>{task.title}</h5></Typography>
                      <Typography><body>{task.description}</body></Typography>
                    </CardContent>
                  </Card>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default TaskList;
