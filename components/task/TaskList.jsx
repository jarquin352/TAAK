import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TaskSearchBar from './TaskSearchBar';

//them attributes that consistently follow that of announcements.jsx
var tasksModel = [
  {"_id":"1", "type_id":"3",'isAssigned':true, "title":"Complete Task 1",'description':'complete the front end','progt':2,'taskSkills':['Machine Learning', 'Web Development'],priority: 'High', assignee: 'Bob Tom'},
  {"_id":"2", "type_id":"4",'isAssigned':true, "title":"Complete Task 2",'description':'complete the test','progt':4,'taskSkills':['Machine Learning', 'Full Stack'],priority: 'Med', assignee: 'Tom Bob'},
  {"_id":"3", "type_id":"5",'isAssigned':true,"title":"Complete Task 3 ",'description':'complete the front end','progt':10,'taskSkills':['UI/UX', 'Object Oriented Programming'],priority: 'Low', assignee: 'Sam Tam'},
  {"_id":"4", "type_id":"5",'isAssigned':true, "title":"Complete Task 4 ",'description':'complete the back end','progt':12,'taskSkills':['Machine Learning'],priority: 'High', assignee: 'Tam Sam'},
  {"_id":"5", "type_id":"4",'isAssigned':true, "title":"Complete Task 5 ",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', 'Web Development','UI/UX'],priority: 'Med', assignee: 'John Jerry'},

  {"_id":"6", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 1",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', 'Web Development','UI/UX'],priority: 'Med', assignee: ''},
  {"_id":"7", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 2",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', 'OOP','UI/UX'],priority: 'Low', assignee: ''},
  {"_id":"8", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 3",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', 'SQL','Python'],priority: 'High', assignee: ''},
  {"_id":"9", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 4",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', 'R','Excel'],priority: 'Low', assignee: ''},

];

// var taskTypesModel = [
//    {"_id":"1", 'name':'New','class':'new','color':'error.dark'},
//    {"_id":"2", 'name':'In Progress','class':'inprogress','color':'warning.dark'},
//    {"_id":"3", 'name':'Done','class':'done','color':'success.dark'}
// ];

var taskTypesModel = [
  {"_id":"1", 'name':'Icebox','class':'icebox','color':'#ab47bc'},
  {"_id":"2", 'name':'Backlog','class':'backlog','color':'#42a5f5'},
  {"_id":"3", 'name':'To Do','class':'todo','color':'error.dark'},
  {"_id":"4", 'name':'In Progress','class':'inprogress','color':'warning.dark'},
  {"_id":"5", 'name':'Done','class':'done','color':'success.dark'}
];






class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLetters: '',
      tasks:tasksModel.filter((task) => task.isAssigned),
      taskTypes:taskTypesModel
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
                  {this.state.tasks?.filter(task => task.type_id === type._id).map(task => (
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
