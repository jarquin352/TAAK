import React from 'react';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import axios from 'axios';

//front end data
//import {tasks, users, projTeam, Sprints, taskTypes, announcements} from '../task/tasksTestData'

class TasksOverview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // tasksOverview: tasks.filter((task) => task.isAssigned),
        // users: users.reduce((obj, user) => {
        //   obj[user.uid] = user.name;
        //   return obj;
        // }, {}),
        sprint: [],
        //taskTypes: window.taakmodels.taskTypesModel(),
        tasksOverview: [],
        users:null
      };
    }

    componentDidMount(){
      this.getOverviewTasks();
    }
  
    getOverviewTasks = () => {
      axios
      .get('/api/getTasks')
      .then(response => {
        console.log(response)
        
        this.setState({
          tasksOverview:response.data.tasksInSprint.filter((task)=> task.isAssigned)
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status===401) {
          window.location.href = '#/login';
        }
      });
    }
    
    render() {
      const { tasksOverview, users, taskTypes } = this.state;
      return (
        <Box
          sx={{
            flexGrow: 1,
            m: 1,
            p: 1,
            bgcolor: "transparent",
            borderColor: "black",
            borderRadius: 5,
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          <h1>Assigned Tasks Overview</h1>
          <Grid container spacing={2}>
            {tasksOverview.map(
              ({_id,title,priority,assignee, description}) => (
                <Grid key={_id} item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      minWidth: 275,
                      borderRadius: 5,
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">{title}</Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">Priority: {priority}</Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">Assignee:{assignee.name}</Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">Description:{description}</Typography>
                      {/* <Typography sx={{ mb: 1 }} color="text.secondary">Term: {term}</Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">Status: {status}</Typography>
                      <Typography sx={{ mb: 1 }} color="text.secondary">Sprint Timeline: {dueDate}</Typography> */}
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      );
    }
  }
  
  export default TasksOverview;
  
  