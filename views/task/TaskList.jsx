import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { css } from "@mui/system";

// import TaskSearchBar from './TaskSearchBar';

//front end data
//import {tasks, users, projTeam, Sprints, taskTypes} from './tasksTestData.js'

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLetters: '',
      // tasks:tasks.filter((task) => task.isAssigned),
      // taskTypes: taskTypes
      tasks: [],
      taskTypes: [],
    };
  }

  componentDidMount(){
    this.userTasks();
    this.typesTask();
  }

  //get all tasks
  userTasks = (req, res) =>{
    axios
    .get('/api/getUserTasks')
    .then(response => {
      const yourTasks = response.data;
      console.log(yourTasks)
      this.setState({
        tasks: yourTasks,
      });
    })
    .catch(error => {
      console.log(error);
      if (error.response.status===401) {
        window.location.href = '#/login';
      }
    });
  }

  typesTask = (req, res) => {
    axios
    .get('/api/getTaskTypes')
    .then(response => {
      const taskTypes = response.data;
      console.log(taskTypes)
      this.setState({
        taskTypes: taskTypes,
      });
    })
    .catch(error => {
      console.log(error);
      if (error.response.status===401) {
        window.location.href = '#/login';
      }
    });
  }


  handledragover = event => {
    event.preventDefault();
  };

  handledrop = event => {
    event.preventDefault();
    var task_id = event.dataTransfer.getData("task_id");
    if(event.target.classList.contains('task-list')) {
      event.target.appendChild(document.getElementById(task_id));
      console.log(task_id)
      const taskInStack = {
        type_id: event.target.getAttribute('type_id'),
        task_id: task_id
    }
    axios
      .post('/api/updateKanban', taskInStack)
      .then(response => {
        let updatedTask = response.data;
        console.log(updatedTask)
        // window.location.href = '/';
      })
      .catch(err => {
                console.log(err.response.data);
                alert(err.response.data);
      });
    }
  };

  handledrag = event => {
    event.dataTransfer.setData("task_id", event.target.attributes.id.value);
  };

  render() {
    console.log(this.state.tasks)
    return (
      <Container disableGutters maxWidth="false" sx={{ 
      px:1, 
      py:1, 
      bgcolor: "transparent",
      borderColor: "black",
      borderRadius: 5,
      fontSize: "0.875rem",
      fontWeight: "700" }}>
        {/* <TaskSearchBar value={this.state.inputLetters} /> */}
         <Typography variant="h4" sx={{ textAlign: 'center', my: 3, textShadow:'7px 1px 26px rgba(0, 0, 0, 0.8)'}}>
          Your Tasks
        </Typography>
        <Container disableGutters maxWidth="ld" component="main">
          {/* <Grid container spacing={2} alignItems="flex-end" > */}
          <Grid container spacing = {2} alighItems = 'flex-end' sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            {this.state.taskTypes?.map(type => (
              //Old grid item that only makes 3 columns....keep for reference
              // <Grid item xs={12} md={4} key={type.name+"-tasks"} className="new-tasks" >
                <Grid item md={2} key={type.name+"-tasks"} className="new-tasks" sx={{background:"rgba(142, 142, 142, 0.2)", margin:1, padding: 2, borderRadius: 5}}>
                <Card variant="outlined" sx={{ borderRadius:5,mb:1, position: "relative",boxShadow: '5px 5px 5px 2px rgba(18, 18, 34, 0.7'}}>
                  <Typography sx={{mx:'auto', width:200}} variant  = 'h5'>{type.name}</Typography>
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
                      borderRightWidth: 4
                    }
                  }}
                >
                  {this.state.tasks?.filter(task => task.type_id === type._id).map(task => (
                  <Card
                    key={"task"+task._id}
                    id={task._id}
                    draggable="true"
                    droppable="false"
                    onDragStart={this.handledrag}
                    variant="outlined"
                    className="task-task"
                    sx={{ 
                      borderRadius: 5, 
                      boxShadow: '5px 5px 5px 2px rgba(18, 18, 34, 0.7)', 
                      
                    }}
                    
                  >
                    <CardContent>
                      <Typography><h4>{task.title}</h4></Typography>
                      <Typography>{task.description}</Typography>
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
