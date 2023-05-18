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
        sprint: [],
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

   /*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */
    getPriorityColor = (priority) => {
      switch(priority) {
        case 'High': case 'high':
          return '#E53147';
        case 'medium': case 'Medium':
          return '#F1B24D';
        case 'Low': case 'low':
          return '#739D42';
        default:
          return 'gray';
      }
    }

/*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */
 
    
    render() {
      const { tasksOverview, users, taskTypes } = this.state;
      return (
        <div>
          <Typography variant="h4" sx={{ textAlign: 'center', textShadow:'7px 1px 26px rgba(0, 0, 0, 0.8)'}}>Tasks Overview</Typography>
          <div style={{background:"rgba(142, 142, 142, 0.2)", margin:45, padding: 16, borderRadius: 20}}>
        <Box
          sx={{
            fontSize: "0.875rem",
            fontWeight: "700",
          }}
        >
          
            <Grid container spacing={2}>
              {tasksOverview.map(
                ({_id,title,priority,assignee, description}) => (
                  <Grid key={_id} item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        minWidth: 275,
                        borderRadius: 5,
                        boxShadow: '5px 5px 5px 2px rgba(18, 18, 34, 0.7)', 
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" component="div">{title}</Typography>
                        <span style={{ mb: 1.5,backgroundColor: this.getPriorityColor(priority), color: '#202020', borderRadius: '15px', padding: '3px 10px' }}>{priority}</span>
                        <Typography sx={{ mb: 1 }} color="text.secondary">Assignee:{assignee.name}</Typography>
                        <Typography sx={{ mb: 1 }} color="text.secondary">Description:{description}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
        </Box>
        </div>
        </div>
      );
    }
  }
  
  export default TasksOverview;
  
