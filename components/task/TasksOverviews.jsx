import React from 'react';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

//obsolete, works on kanbanApp.js for front end testing (same user assigned tasks)
var tasksOverview = [
    {"_id":"1", "type_id":"1",'isAssigned':true, "title":"Complete Task 1",'description':'complete the front end','progt':2,'taskSkills':['Machine Learning', 'Web Development'],priority: 'High', assignee: 'Bob Tom'},
      {"_id":"2", "type_id":"2",'isAssigned':true, "title":"Complete Task 2",'description':'complete the test','progt':4,'taskSkills':['Machine Learning', 'Full Stack'],priority: 'Med', assignee: 'Bob Tom'},
];

class TasksOverviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //reads from kanbanApp.js
          tasksOverview: tasksOverview
        };
      }


    render() {
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
                    fontWeight: "700"
                }}
            >
                <h1>Tasks Overview</h1>
                <Grid container spacing={2}>
                    {this.state.tasksOverview.map((tasksOverview) => (
                        <Grid key={tasksOverview.id} item xs={12} sm={6} md={4} >
                            <Card sx={{ minWidth: 275, borderRadius: 5, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">{tasksOverview.title}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">Priority: {tasksOverview.priority}</Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">Asignees: {tasksOverview.assignee}</Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">Term: {tasksOverview.term}</Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">Status: {tasksOverview.status}</Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">Due Date: {tasksOverview.dueDate}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }
}

export default TasksOverviews;
          
