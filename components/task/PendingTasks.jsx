import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, styled, Input} from '@mui/material';
import Typography from '@mui/material/Typography';
import { taskAssigner } from './taskassigner.js';


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
        assignee: ''
      },
      //showForm: false, //this will default our form to false, if it is true, then the form will be open without the need to click the button
      showDialog: false,
      pendingTasks: tasks.filter((task) => !task.isAssigned),//current list of pending tasks
      users: users,
    };

  }


  
/*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */

  //first function --> need to toggle the form, this should simply be boolean, turns form off and on nly
  formToggle = () =>{
    this.setState({
      //showForm: !this.state.showForm //!(Whatever is opposite; i.e if it is currently off, it will turn the state on, and vice versa...)
      showDialog: !this.state.showDialog
    });
  }

/*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */

  //second function --> handle user input function
  handleInputChange = (event) => {
    //this focuses on the HTML tag with name, i.e in <input name = "nameofdesc"> with the user input value
    const { name, value } = event.target;
    //state manipulation, we want to update the state, as initially it is at '' for the Object
    this.setState((prevState) => ({
      newTask: {
        //Now we append that prevState to an empty Object newTask
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
    event.preventDefault() //prevents DOM refresh with default form behavior 
    const newId = tasks.length + 1; // initializer for tasks.ID, starts at the size of our var tasks [{},{};]

    //...this.state.newTasks expands the state of newTask, like an iterable, and is adding the ID key to each key:value
    let newTask = {'_id': String(newId),'type_id': '1','isAssigned': false,...this.state.newTask};
    newTask.progt = parseInt(newTask.progt)
    
    //once complete, we push our new information to our global tasks.

    tasks.push(newTask)
    console.log(tasks)

    //empty out the form after by resetting everything, turns off the showDialog, and updates pendingTasks to reflect changes
    this.setState({
      newTask:{
        title: '',
        description: '',
        progt: null,
        taskSkills: '',
        priority: '',
        assignee: ''
      },
      //showForm:false
      showDialog: false,
      pendingTasks: tasks.filter((task) => !task.isAssigned)
    });
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
  render(){
    // const { showForm, newTask } = this.state;
    const {showDialog, pendingTasks, users, newTask} = this.state;
    console.log('Pending Tasks:', pendingTasks);
    const suggestedTaskAssignments = taskAssigner(users, pendingTasks)
    console.log(suggestedTaskAssignments)
    console.log('Pending Tasks 2:', pendingTasks);
    return(
      <div>
      <Typography variant="h3" sx={{ textAlign: 'center', my: 3 }}>Pending Tasks</Typography>
        {/*Button Styling */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginRight: '10px' }}>
          <Button variant="contained" onClick={this.formToggle}>Add Task</Button>
        </div>
        {/*Dialog Form Option*/}
        <Dialog open = {showDialog} onClose={this.formToggle}>
          <DialogTitle>Add New Task</DialogTitle>
            <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2
            }}>
              <input type = "text" name = "title" placeholder = "Task Title" value = {newTask.title} onChange = {this.handleInputChange} />
              <input type = "text" name = "description" placeholder = "Task Description" value = {newTask.description} onChange = {this.handleInputChange} />
              <input type = "number" name = "progt" placeholder = "Estimated Programming Time (hours)" value = {newTask.progt} onChange = {this.handleInputChange} />
              <input type = "text" name = "taskSkills" placeholder = "Skills Required" value = {newTask.taskSkills} onChange = {this.handleInputChange} />
              <input type = "text" name = "priority" placeholder = "Priority (High, Med, Low)" value = {newTask.priority} onChange = {this.handleInputChange} />
              <input type = "text" name = "assignee" placeholder = "Task Assignee" value = {newTask.assignee} onChange = {this.handleInputChange} />
              
            </DialogContent>
            <DialogActions>
              <Button onClick = {this.formToggle}>Cancel</Button>
              <Button variant = 'contained' onClick = {this.handleSubmit}>Add Task</Button>
            </DialogActions>
        </Dialog>

        {/*Table View for pending tasks */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', margin: .5}} aria-label="simple table">
            <TableHead>
              <TableRow sx={{borderRadius: 5}}>
                <TableCell align="left">Task Title</TableCell>
                <TableCell align="left">Task Description</TableCell>
                <TableCell align="left">Task Priority</TableCell>
                <TableCell align="left">Skills Required</TableCell>
                <TableCell align="left">Hours Estimated</TableCell>
                <TableCell align="left">Assign To</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  {this.state.pendingTasks.map((task) => (
                    <TableRow
                      key={task.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{task.title}</TableCell>
                      <TableCell align="left">{task.description}</TableCell>
                      <TableCell align="left">{task.priority}</TableCell>
                      <TableCell align="left">{task.taskSkills+" "}</TableCell>
                      <TableCell align="left">{task.progt}</TableCell>
                      {/* <TableCell align="left">{task.assignee}</TableCell> */}
                      <TableCell>
                        {/*Select menu for users....*/}
                        {/* <select onChange={(event) => console.log(`Hello ${event.target.selectedOptions[0].text}`)}> */}
                        {/* <select onChange={(event) => console.log(`Hello ${event.target.value}`)}> */}
                        <select onChange  = {this.handleAssigner}>
                            <option title>Select a User </option>
                            <option disabled>Suggested User: </option>
                            <option value =  {suggestedTaskAssignments.some((suggestedTask) => suggestedTask.taskid === task._id)?
                              "uid"+suggestedTaskAssignments.find((suggestedTask) => suggestedTask.taskid === task._id).userid: 'emptyuser'}>
                            {/*suggestedTaskAssignments.some((suggestedTask) => suggestedTask._id === task._id)?
                            suggestedTaskAssignments.find((suggestedTask) => suggestedTask._id === task._id).assignee: ''*/}
                            {suggestedTaskAssignments.some((suggestedTask) => suggestedTask.taskid === task._id)?
                            suggestedTaskAssignments.find((suggestedTask) => suggestedTask.taskid === task._id).usermatch: ''}
                            
                            </option>
                            <option disabled value = "op-0">Select User: </option>
                          {this.state.users.map((user) => (
                            <option value = {"uid"+ user.uid}sx={{paddingTop: 50}}>{user.name}</option>
                          ))}
                        </select>
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


/*0000000000000000000000000000000000____MOCK DATA FOR TESTING___0000000000000000000000000000000000000000000000 */

const tasks = [
  {
    _id: "1",
    type_id: "1",
    isAssigned: true,
    title: "Assigned Task 1",
    description: "complete the front end",
    progt: 2,
    taskSkills: [],
    priority: "High",
    assignee: "Bob Tom"
  },
  {
    _id: "2",
    type_id: "2",
    isAssigned: true,
    title: "Assigned Task 2",
    description: "complete the test",
    progt: 4,
    taskSkills: [],
    priority: "Med",
    assignee: "Tom Bob"
  },
  {
    _id: "3",
    type_id: "3",
    isAssigned: true,
    title: "Assigned Task 3 ",
    description: "complete the front end",
    progt: 10,
    taskSkills: [],
    priority: "Low",
    assignee: "Sam Tam"
  },
  {
    _id: "4",
    type_id: "3",
    isAssigned: true,
    title: "Assigned Task 4 ",
    description: "complete the back end",
    progt: 12,
    taskSkills: [],
    priority: "High",
    assignee: "Tam Sam"
  },
  {
    _id: "5",
    type_id: "2",
    isAssigned: true,
    title: "Assigned Task 5 ",
    description: "complete the front end",
    progt: 5,
    taskSkills: [],
    priority: "Med",
    assignee: "John Jerry"
  },

  {
    _id: "6",
    type_id: "1",
    isAssigned: false,
    title: "This Should be Stacy",
    description: "Statistics Stuff",
    progt: 5,
    taskSkills: ["R", "Excel", "MachineLearning"],
    priority: "Low",
    assignee: ""
  },
  {
    _id: "7",
    type_id: "1",
    isAssigned: false,
    title: "This should be Charlie",
    description: "Do something with C++",
    progt: 5,
    taskSkills: ["C++", "C"],
    priority: "Low",
    assignee: ""
  },
  {
    _id: "8",
    type_id: "1",
    isAssigned: false,
    title: "This Should be Frank",
    description: "Develop a Login UI",
    progt: 10,
    taskSkills: ["HTML", "CSS", "Javascript"],
    priority: "Med",
    assignee: ""
  },
  {
    _id: "9",
    type_id: "1",
    isAssigned: false,
    title: "This should be Bob",
    description: "Develop API to fecth data from MongoDB",
    progt: 4,
    taskSkills: ["MongoDB", "Javascript", "ExpressJS"],
    priority: "Low",
    assignee: ""
  },
  {
    _id: "10",
    type_id: "1",
    isAssigned: false,
    title: "This Should be Dave",
    description: "Create Schema for the SQL/noSQL DBs",
    progt: 5,
    taskSkills: ["SQL", "MongoDB"],
    priority: "High",
    assignee: ""
  }
];



const users = [
    {
      uid: 1,
      name: "Frank the Front End",
      skills: ["HTML", "CSS", "Javascript", "ReactJS"],
      tasks_assigned: []
    },
    {
      uid: 2,
      name: "Bob the Back End",
      skills: ["MongoDB", "Python", "Javascript", "Django", "ExpressJS"],
      tasks_assigned: []
    },
    {
      uid: 3,
      name: "Dave the Databaser",
      skills: ["SQL", "Python", "C++", "MongoDB", "R"],
      tasks_assigned: []
    },
    {
      uid: 4,
      name: "Charlie the C-er",
      skills: ["SQL", "C++", "C", "C#", "Java"],
      tasks_assigned: []
    },
    {
      uid: 5,
      name: "Stacy the Statician",
      skills: ["C#", "R", "Excel", "MachineLearning", "Python"],
      tasks_assigned: []
    }
  ];


//test task information (old)
// const tasks = [
//   { id: 1, status: 'Pending', name: 'Complete Front End', priority: 'High', assignee: '' },
//   { id: 2, status: 'In Progress', name: 'Complete SRS', priority: 'Medium', assignee: '' },
//   { id: 3, status: 'Pending', name: 'Complete SPMP', priority: 'Low', assignee: '' },
//   { id: 4, status: 'Completed', name: 'Graduate', priority: 'High', assignee: '' },
// ];

// var tasks = [
//   {"_id":"1", "type_id":"1",'isAssigned':true, "title":"Complete Task 1",'description':'complete the front end','progt':2,'taskSkills':['Machine Learning', 'Web Development'],priority: 'High', assignee: 'Bob Tom'},
//   {"_id":"2", "type_id":"2",'isAssigned':true, "title":"Complete Task 2",'description':'complete the test','progt':4,'taskSkills':['Machine Learning', 'Full Stack'],priority: 'Med', assignee: 'Tom Bob'},
//   {"_id":"3", "type_id":"3",'isAssigned':true,"title":"Complete Task 3 ",'description':'complete the front end','progt':10,'taskSkills':['UI/UX', 'Object Oriented Programming'],priority: 'Low', assignee: 'Sam Tam'},
//   {"_id":"4", "type_id":"3",'isAssigned':true, "title":"Complete Task 4 ",'description':'complete the back end','progt':12,'taskSkills':['Machine Learning'],priority: 'High', assignee: 'Tam Sam'},
//   {"_id":"5", "type_id":"2",'isAssigned':true, "title":"Complete Task 5 ",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', 'Web Development','UI/UX'],priority: 'Med', assignee: 'John Jerry'},

//   {"_id":"6", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 1",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', ' Web Development',' UI/UX'],priority: 'Med', assignee: ''},
//   {"_id":"7", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 2",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', ' OOP',' UI/UX'],priority: 'Low', assignee: ''},
//   {"_id":"8", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 3",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', ' SQL',' Python'],priority: 'High', assignee: ''},
//   {"_id":"9", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 4",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', ' R',' Excel'],priority: 'Low', assignee: ''},
// ];