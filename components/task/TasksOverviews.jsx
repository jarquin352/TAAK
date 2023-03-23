import React from 'react';
import Container from '@mui/material/Container';
import Announcements from '../announcements/Announcements';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

var tasksOverview = [
    {'id':'1','title':'TEST 1','priority':'High','asignees':'Tom Bob','term':'LONG TERM','status':'complete','dueDate':'12/12/1222'},
    {'id':'2','title':'TEST 2','priority':'LOW','asignees':'Bob Tom','term':'SHORT TERM','status':'INCOMPLETE','dueDate':'12/12/1222'}
];

class TasksOverviews extends React.Component {
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
                <Grid container spacing={2}sx={{bgcolor: "blue"}}>
                    {tasksOverview.map((tasksOverview) => (
                        <Grid key={tasksOverview.id} item xs={12} sm={6} md={4} sx={{bgcolor: "green"}}>
                            <Card sx={{ minWidth: 275, borderRadius: 5, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">{tasksOverview.title}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">Priority: {tasksOverview.priority}</Typography>
                                    <Typography sx={{ mb: 1 }} color="text.secondary">Asignees: {tasksOverview.asignees}</Typography>
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
          
