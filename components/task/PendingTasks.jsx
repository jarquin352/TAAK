import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Button from '@mui/material/Button';

//test task information
const tasks = [
  { id: 1, status: 'Pending', name: 'Complete Front End', priority: 'High', assignee: '' },
  { id: 2, status: 'In Progress', name: 'Complete SRS', priority: 'Medium', assignee: '' },
  { id: 3, status: 'Pending', name: 'Complete SPMP', priority: 'Low', assignee: '' },
  { id: 4, status: 'Completed', name: 'Graduate', priority: 'High', assignee: '' },
];


class PendingTasks extends React.Component{
  //constructor initializes components state, binds defined methods to this
  constructor(props){
    super(props); //this calls constructor(props) and calls class PendingTasks, and allows this component to inherit properties
    this.state = {
      //default state for newTask in our form, everything should be blank, if there are non empty 
      //strings, this will populate in the form
      newTask: {  
        status: '',
        name: '',
        priority: '',
        assignee: ''
      },
      showForm: false //this will default our form to false, if it is true, then the form will be open without the need to click the button

    };

  }

/*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */

  //first function --> need to toggle the form, this should simply be boolean, turns form off and on nly
  formToggle = () =>{
    this.setState({
      showForm: !this.state.showForm //!(Whatever is opposite; i.e if it is currently off, it will turn the state on, and vice versa...)
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
    const newTask = {...this.state.newTask, id: newId};
    
    //once complete, we push our new information to our global tasks.
    tasks.push(newTask)

    //empty out the form after by resetting everything
    this.setState({
      newTask:{
        status: '',
        name: '',
        priority:'',
        assignee: ''
      },
      showForm:false
    });
  }

/*000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */
  render(){
    const { showForm, newTask } = this.state;
    return(
      <div>
        {/*Button Styling */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginRight: '10px' }}>
          <Button variant="contained" onClick={this.formToggle}>Add Task</Button>
        </div>


        {showForm && (
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
        )}

        {/*Table View for pending tasks */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell align="left">Task Name</TableCell>
                <TableCell align="left">Task Priority</TableCell>
                <TableCell align="left">Assignee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  {tasks.map((task) => (
                    <TableRow
                      key={task.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {task.status}
                      </TableCell>
                      <TableCell align="left">{task.name}</TableCell>
                      <TableCell align="left">{task.priority}</TableCell>
                      <TableCell align="left">{task.assignee}</TableCell>
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