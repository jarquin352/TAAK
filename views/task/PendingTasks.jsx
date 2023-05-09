import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,TextField, Paper, Button, styled, Input} from '@mui/material';
import Typography from '@mui/material/Typography';
import {Dialog,DialogContent,DialogContentText,DialogTitle,DialogActions} from '@mui/material'

import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

import { taskAssigner } from './taskassigner.js';
import {FormControl, FormLabel, FormControlLabel} from '@mui/material';
import { RadioGroup, Radio } from '@mui/material';
import axios from 'axios';


//import {tasks, users, projTeam, Sprints} from './tasksTestData.js'


class PendingTasks extends React.Component{
  //constructor initializes components state, binds defined methods to this
  constructor(props){
    super(props); //this calls constructor(props) and calls class PendingTasks, and allows this component to inherit properties
    this.state = {
      //default state for newTask in our form, everything should be blank, if there are non empty 
      //strings, this will populate in the form
      newTask:{
        title: '',
        description: '',
        progt:null,
        taskSkills: '',
        priority: '',
        assignee: '',
        date: null
      },
      //showForm: false, //this will default our form to false, if it is true, then the form will be open without the need to click the button
      showDialog: false,
      //pendingTasks: tasks.filter((task) => !task.isAssigned),//current list of pending tasks
      pendingTasks: [],
      //users: users,
      users: [],
      showDeleteDialog: false,
      selectedTaskId:null,
    };

  }
/*000000000000000000000000000000000000000000____Initialize Data_____000000000000000000000000000000000000000000000000000000000000000000000 */
componentDidMount(){
  this.getPendingTasks();
  this.getUsers();
}

getPendingTasks = () => {
  axios
  .get('/api/getTasks')
  .then(response => {
    //console.log(response)
    this.setState({
      pendingTasks:response.data.filter((task)=> !task.isAssigned)
    });
  })
  .catch(error => {
    console.log(error);
    if (error.response.status===401) {
      window.location.href = '#/login';
    }
  });
}

getUsers = () => {
  axios
  .get('/api/allUsers')
  .then(response => {
    console.log(response.data)
    this.setState({
      users:response.data
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

  //first function --> need to toggle the form, this should simply be boolean, turns form off and on nly
  formToggle = () =>{
    this.setState({
      //showForm: !this.state.showForm //!(Whatever is opposite; i.e if it is currently off, it will turn the state on, and vice versa...)
      showDialog: !this.state.showDialog,
      newTask:{
        title: '',
        description: '',
        progt: null,
        taskSkills: [],
        priority: '',
        assignee: '',
        date: null
      }
    });
  }


/*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */

  //second function --> handle user input function
  handleInputChange = (name,event) => {
    //this focuses on the HTML tag with name, i.e in <input name = "nameofdesc"> with the user input value
    const value = event.target.value;
    //state manipulation, we want to update the state, as initially it is at '' for the Object
    this.setState(prevState => ({
      newTask: {
        ...prevState.newTask,
        [name]: value
      }
    }));
  }
  

  /*As we continue typing, handleInputChange will appropriately find the <input name="name"> and update it, if it is 
      new, it will create a new key:value pair In the final submission, it will append it to the newtasks variable, and
      it uses that for the function below  */

/*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */
  //third function --> handle the instance of form submission (when user finishes and hits enter)
  handleSubmit = (event) => {
    console.log('Works')
    event.preventDefault() //prevents DOM refresh with default form behavior 
    //const newId = tasks.length + 1; // initializer for tasks.ID, starts at the size of our var tasks [{},{};]

    //...this.state.newTasks expands the state of newTask, like an iterable, and is adding the ID key to each key:value
    let newTask = {"isAssigned": false,...this.state.newTask};
    newTask.taskSkills = newTask.taskSkills.split(', ');
    newTask.date = new Date(newTask.date);
    console.log(newTask);
    newTask.progt = parseInt(newTask.progt);


    axios
    .post('/api/createTask', newTask)
    .then(response => {
      let tasks = response.data;
      console.log(tasks)
      //empty out the form after by resetting everything, turns off the showDialog, and updates pendingTasks to reflect changes
      this.setState({
        newTask:{
          title: '',
          description: '',
          progt: null,
          taskSkills: '',
          priority: '',
          assignee: '',
          date: null
        },
        //showForm:false
        showDialog: false,
        pendingTasks: tasks.filter((task) => !task.isAssigned)
        // pendingTasks: window.taakmodels.tasksModel().filter((task)=> !task.isAssigned),
      });
    })
    .catch(err => {
              console.log(err.response.data);
              alert(err.response.data);
    });
    
  }
/*0000000000000000000000000000000000000000000000000000000__Handles the Deleteing of Tasks + Button__000000000000000000000000000000000000000000 */
handleDeleteDialogOpen = (id) => {
  console.log(id)
  this.setState({
    showDeleteDialog: true,
    selectedTaskId: id
  });
};

handleDeleteDialogClose = () => {
  this.setState({
    showDeleteDialog:!this.state.showDeleteDialog,
    selectedTaskId: null
  });
};
handleTaskDelete = () =>{
  const delTask = {
    _id: this.state.selectedTaskId
  }
  console.log(delTask)
  axios
  .delete("/api/delAnnouncement", { data: delTask })
  .then(response => {
    console.log(response)
    location.reload();
  })
  .catch(err => {
    console.log(err.response.data);
  });
  this.handleDeleteDialogClose();
}
/*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */
//this function will appropriately assign the members to the tasks, and switch to true:
handleAssigner = (event) =>{
  event.preventDefault();
  const value = event.target.value;
  let testRes = event.target.value.replace('uid','')
  console.log(testRes)
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
  render(){
    // const { showForm, newTask } = this.state;
    const {showDialog, pendingTasks, users, newTask, showDeleteDialog} = this.state;
    //console.log('Pending Tasks:', pendingTasks);
    const suggestedTaskAssignments = taskAssigner(users, pendingTasks)
    //console.log(suggestedTaskAssignments)
    //console.log('Pending Tasks 2:', pendingTasks);
    return (
      
      <div style={{ padding: '80px'}}>
        <Typography variant="h4" sx={{ textAlign: 'center', my: 3 }}>Pending Tasks</Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginRight: '10px' }}>
          {/* <Button variant="contained" onClick={this.formToggle}>Add Task</Button> */}
          {/*This button is for adding a task. */}
          <Button variant="contained" style={{backgroundColor:'#191f45', color:'#8F95B9', border: '3px double rgba(25, 31, 69, 0.1)', borderRadius: "10px"}}
            onClick={this.formToggle}
            ><AddCircleTwoToneIcon/></Button>
        </div>
        {/*Dialog Form Option*/}
        <Dialog open={showDialog} onClose={this.formToggle}> 
              <DialogTitle>Task Information</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Task Title"
                  type="text"
                  fullWidth
                  onChange={(e) => this.handleInputChange("title", e)}
                />
                  <TextField
                    margin="dense"
                    id="description"
                    label="Task Description"
                    type="text"
                    fullWidth
                    onChange={(e) => this.handleInputChange("description", e)}
                  />
                <TextField
                  margin='dense'
                  id="date"
                  label="Sprint Date"
                  type="date"
                  fullWidth
                  onChange={(e) => this.handleInputChange("date", e)}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              <FormControl component="fieldset" margin="dense">
                <FormLabel component="legend">Task Priority</FormLabel>
                <RadioGroup
                  aria-label="priority"
                  name="priority"
                  value={this.state.priority}
                  onChange={(e) => this.handleInputChange("priority", e)}
                >
                  <FormControlLabel value="Low" control={<Radio />} label="Low" />
                  <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                  <FormControlLabel value="High" control={<Radio />} label="High" />
                </RadioGroup>
              </FormControl>
              <TextField
                  margin='dense'
                  id="progt"
                  label="Estimated Time Required (Hours)"
                  type="number"
                  fullWidth
                  onChange={(e) => this.handleInputChange("progt", e)}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  margin='dense'
                  id="taskSkills"
                  label="Skills Required"
                  type="text"
                  fullWidth
                  onChange={(e) => this.handleInputChange("taskSkills", e)}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.formToggle}>Cancel</Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
        {/*Dialog for Deleting a Task*/}
        <Dialog open={this.state.showDeleteDialog} onClose={this.handleDeleteDialogClose}>
              <DialogTitle>Delete Task</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this task? This cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDeleteDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleTaskDelete}  style={{color:'#E53147'}}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
        {/*Dialog for Deleting a Task*/}
        <TableContainer component={Paper} style ={{border:'4px inset #4e43c0', boxShadow: "10px 8px 31px rgba(2, 25, 69, 0.6)",borderRadius: "15px"}}>
          <Table aria-label="pending-tasks-table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Skills Required</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Assignee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.pendingTasks.map((task) => (
                <TableRow
                  key={task._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{task.title}</TableCell>
                  <TableCell align="left">{task.description}</TableCell>
                  <TableCell align="left">
                    <span style={{ backgroundColor: this.getPriorityColor(task.priority), color: 'white', borderRadius: '15px', padding: '3px 10px' }}>{task.priority}</span>
                  </TableCell>
                  <TableCell align="left">{task.taskSkills + " "}</TableCell>
                  <TableCell align="left">{task.progt}</TableCell>
                  <TableCell>
                    <div style={{ position: 'relative' }}>
                      <select
                        onChange={this.handleAssigner}
                        style={{
                          backgroundColor: '#817D89',
                          color: '#000000',
                          border: 'none',
                          padding: '8px 36px 8px 12px',
                          borderRadius: '50px',
                          appearance: 'none',
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <option title>Select a User </option>
                        <option disabled>Suggested User: </option>
                        <option
                          value={
                            suggestedTaskAssignments.some(
                              (suggestedTask) => suggestedTask.taskid === task._id
                            )
                              ? 'uid' +
                                suggestedTaskAssignments.find(
                                  (suggestedTask) => suggestedTask.taskid === task._id
                                ).userid
                              : 'emptyuser'
                          }
                        >
                          {suggestedTaskAssignments.some(
                            (suggestedTask) => suggestedTask.taskid === task._id
                          )
                            ? suggestedTaskAssignments.find(
                                (suggestedTask) => suggestedTask.taskid === task._id
                              ).usermatch
                            : ''}
                        </option>
                        <option disabled value="op-0">
                          Select User:{' '}
                        </option>
                        {this.state.users.map((user) => (
                          <option value={'uid' + user.uid}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                  </TableCell>
                  <TableCell align="jusitfy">
                  <Button variant="contained" style={{backgroundColor:'#f95050', color:'rgba(242, 238, 238, 0.8)', border: '1px groove rgba(40, 40, 40, 0.6)', borderRadius: "10px"}}
                  onClick={() => this.handleDeleteDialogOpen(task._id)}><HighlightOffTwoToneIcon/></Button>
                  </TableCell>
    </TableRow>
  ))}
</TableBody>

              </Table>
            </TableContainer>
           </div> 
        );
    }

}
export default PendingTasks;



/*00 BACK END CODE TO POST THIS DATA INTO OUR MONGODB  0000000000000000000000000000000000000000000000000000000 */

// handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   console.log({
//     description: data.get('description'),
//     type_id: data.get('type_id')
//   });

//   axios
//     .post("/api/tasks", {
//       description: data.get('description'),
//       type_id: data.get('type_id')
//     })
//     .then(response => {
//       location.reload();
//     })
//     .catch(err => {
//       console.log(err.response.data);
//     });
// };

/*00 BACK END CODE TO POST THIS DATA INTO OUR MONGODB  0000000000000000000000000000000000000000000000000000000 */

/*0000000000000000000000000000000000____FORM OPTION___0000000000000000000000000000000000000000000000 */
        {/* {showForm && (
          <form onSubmit={this.handleSubmit}>
            <label>Status:</label>
            <input type="text" name="status" value={newTask.status} onChange={this.handleInputChange} />
            <label>Task Name:</label>
            <input type="text" name="name" value={newTask.name} onChange={this.handleInputChange} />
            <label>Task Priority:</label>
            <input type="text" name="priority" value={newTask.priority} onChange={this.handleInputChange} />
            <label>Assignee:</label>
            <input type="text" name="assignee" value={newTask.assignee} onChange={this.handleInputChange} />
            <button type="submit">Add</button>
          </form>
        )} */}
/*0000000000000000000000000000000000____FORM OPTION___0000000000000000000000000000000000000000000000 */
