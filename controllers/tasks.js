const mongoose = require('mongoose');
const {Task, TaskType, Users, Projectteam, Sprint, Announcements, Auth} = require('../models/dataSchema');

// /*Database connection*/
// //lines 10 to 23 are configs to .env + database connections
// const path = require('path');
// const dotenv = require('dotenv');
// const e = require('express');
// const envPath = path.join(__dirname, '..', '.env');
// dotenv.config({ path: envPath });

// //remove db connection after testing functions
// mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//       console.log('Database connection established');
//       //testRegister();
//       testCode();
//   })
//   .catch((err) => console.error('Database connection error', err));



//get all tasks...
const getTasks = async (req, res) => {
    if (!req.session.user) {
      res.status(401).send('Authentication required, please login');
      return;
    }
    const userReq = await Users.findOne({authid:req.session.user._id})
    const sprintReq = await Sprint.findOne({teamid:userReq.teamid});
    console.log(sprintReq);

    try {
      if(userReq.isAdmin){
        const sprintTasks = await Sprint.findOne({teamid:userReq.teamid})
        .populate({
          path: "tasksInSprint",
          model: Task,
          populate: { path: "assignee", model:Users, select: 'name' }
        });
        res.status(200).send(sprintTasks);
        console.log(sprintTasks.tasksInSprint[0].assignee.name)
        // res.status(400).send('team tasks sent')
      }
      //triggers kanban call
      else{
        const selfTasks = await Task.find({assignee: userReq._id})
        res.status(200).send(selfTasks);
      }
    } catch (err) {
      console.log(err);
      res.status(400).send('Unable to get tasks');
    }
  };

const getUserTasks = async(req, res) => {
  if (!req.session.user) {
    res.status(401).send('Authentication required, please login');
    return;
  };
  const userReq = await Users.findOne({authid:req.session.user._id})
  try{
    console.log(userReq)
    const tasks = await Task.find({assignee:userReq._id});
    res.status(200).send(tasks);
  } catch (err) {
    console.log(err);
    res.status(400).send('Unable to get user specific tasks');
  };
};

const getTaskTypes = async (req, res) =>{
  if (!req.session.user) {
    res.status(401).send("Not logged in");
    return;
  }
  try{
    var query = await TaskType.find({});
    res.status(200).send(query);
  } catch (err) {
    console.log(err);
    res.status(400).send('Unable to get types of tasks');
  };
}

const updateTask = async (req, res) =>{
  if (!req.session.user) {
    res.status(401).send("Not logged in");
    return;
  }
  const {type_id, task_id} = req.body;
  try{
    const updateTask = await Task.findOneAndUpdate({_id:task_id},{type_id:type_id});
    res.status(200).send('Successfully updated the task.');
  } catch (err) {
    console.log(err);
    res.status(400).send('Unable to get types of tasks');
  };
}

//create a task....
const createTask = async (req, res) => {
    if (!req.session.user) {
      res.status(401).send('Authentication is required, please login');
      return;
    }
  
    //get req data
    const {date, description, isAssigned, priority, progt, taskSkills, title} = req.body;
    //get backlog id to append to new task, they will always default to backlog.
    const backlog = await TaskType.findOne({class:'backlog'});
    const userInfo = await Users.findOne({authid: req.session.user._id});
    const sprintInfo = await Sprint.findOne({teamid: userInfo.teamid});
    try {
    const newTask = await Task.create({
        _id: new mongoose.Types.ObjectId(),
        type_id:backlog._id,
        sprintid: sprintInfo._id,
        isAssigned:isAssigned,
        title: title,
        description:description,
        progt:progt,
        taskSkills:taskSkills,
        priority:priority,
        assignee:null
    });
    await newTask.save();
    //push task into sprint
    sprintInfo.tasksInSprint.push(newTask._id);
    await sprintInfo.save();
    res.status(200).send('Succesfully created a new task')
    } catch (err) {
      console.log(err);
      res.status(400).send('Unable to create tasks');
    }
  };

  //assign a task....
const assignTask = async (req, res) =>{
    // if (!req.session.user_id) {
    //   res.status(401).send('Authentication required, please login');
    //   return;
    // }  
    const {task_id, user_id} = req.body;
    try{
        if(!task_id){
          res.status(400).send('A task needs to be selected in order to assign it.')
        }
        if(!user_id){
          res.status(400).send('An empty user cannot be assigned.')
        }
        else{
          //assign the task to the user
          const existingTask = await Task.findOne({_id:task_id});
          existingTask.isAssigned = true;
          existingTask.assignee = new mongoose.Types.ObjectId(user_id)
          await existingTask.save();
          //update the user account
          const existingUser = await Users.findOne({_id:user_id});
          existingUser.tasks_assigned.push(task_id);
          await existingUser.save();
          res.status(200).send('The task has been sucecessfully assigned.');
        }
    }
    catch (err) {
      console.log(err);
      res.status(400).send('Unable to assign the task');
    }
}

//delete a task....
const deleteTask = async (req, res) =>{
  if (!req.session.user) {
    res.status(401).send('Authentication required, please login');
    return;
  }  
  const {task_id} = req.body;
  try{
      if(!task_id){
        res.status(400).send('A task needs to be selected in order to delete it.')
      }

      else{
        //find the task
        const existingTask = await Task.findOne({_id:task_id});
        if(!existingTask.isAssigned){
          await Task.deleteOne({_id:task_id});
          res.status(200).send('unassigned task deleted');
        }
        else{
          //remove from sprint
          console.log(existingTask)
          const sprintUpdate = await Sprint.updateOne({_id: existingTask.sprintId}, {$pull: {tasksInSprint: existingTask._id}});
          //remove from user
          const userUpdate = await Users.updateOne({_id:existingTask.assignee}, {$pull:{tasks_assigned:existingTask._id}});
          await Task.deleteOne({_id:task_id});
          res.status(200).send('Assigned tasks removed from sprint, and user.');
        }
      }
  }
  catch (err) {
    console.log(err);
    res.status(400).send('Unable to delete the assigned task');
  }
}

module.exports = {getTasks,createTask,assignTask,deleteTask, getUserTasks, getTaskTypes, updateTask}

/*Test code*/

//testcode for getTasks (works)
// const testCode = async() => {
//   const req = {session:{user:{_id:'645327bd38a1fae459caa96c'}}}

//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await getTasks(req, res);
// }

// //testcode for createTask(works)
// const testCode = async() => {
//   const req = {body:
//       // {
//       //   type_id: '6453329af7d6d23a5768c5bf', //backlog
//       //   sprintid: '645327bd38a1fae459caa963',
//       //   isAssigned:false,
//       //   title:'hello',
//       //   description:'test from express',
//       //   progt: 3,
//       //   taskSkills: ['C++', 'C', 'Python'],
//       //   priority: 'High',
//       //   assignee: null
//       // }

//       {
//         isAssigned: false,
//         title: 'New Task',
//         description: 'Description',
//         progt: '5',
//         taskSkills: [ 'C++', 'Python', 'Java' ],
//         priority: 'medium',
//         assignee: '',
//         date: '2023-01-14'
//       },
//       session:{user:{_id:'645327bd38a1fae459caa96c'}}
//   }

//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await createTask(req, res);
// }

// //testcode for assignTask(works)
// const testCode = async() => {
//   const req = {body:
//       {
//         task_id: "6457df7d269ff8bfa4bcd751",
//         user_id: '645327bd38a1fae459caa95c'
//       }
//   }

//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await assignTask(req, res);
// }

// //testcode for deleteTask(works)
// //for unassigned task
// const testCode = async() => {
//   const req = {body:
//       {
//         task_id: "6457ea3c269ff8bfa4bcd752",
//       }
//   }

//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await deleteTask(req, res);
// }

// // //testcode for deleteTask(works)
// // //for assigned task
// const testCode = async() => {
//   const req = {body:
//       {
//         task_id: "6457ea4d269ff8bfa4bcd753",
//       }
//   }
//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await deleteTask(req, res);
// }

// //testcode for getTasks (works)
// const testCode = async() => {
//   const req = {session:{user:{_id:'645327bd38a1fae459caa96c'}}}

//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await getUserTasks(req, res);
// }

//testcode for getTaskTypes (works)
// const testCode = async() => {
//   const req = {session:{user:{_id:'645327bd38a1fae459caa96c'}}}

//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await getTaskTypes(req, res);
// }