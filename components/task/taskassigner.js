//THIRD APPROACH 
export const taskAssigner = (users, tasks) => {
  let resArray = [];
  // Build a lookup table that maps each skill to the users that have that skill
  const skillToUsers = new Map();
  for (const user of users) {
    for (const skill of user.skills) {
      if (!skillToUsers.has(skill)) {
        skillToUsers.set(skill, []);
      }
      skillToUsers.get(skill).push(user);
    }
  }

  // Filter out unassigned tasks
  const unassignedTasks = tasks.filter((task) => !task.isAssigned);

  // Assign each unassigned task to the best matching user
  for (const task of unassignedTasks) {
    const taskSkills = task.taskSkills;
    let bestMatch = null;
    let bestMatchLength = null;
    let taskMatchId = null;
    let bestMatchId = null;
    for (const skill of taskSkills) {
      const usersWithSkill = skillToUsers.get(skill) || [];
      for (const user of usersWithSkill) {
        const commonValues = taskSkills.filter((value) =>
          user.skills.includes(value)
        ).length;
        if (bestMatch === null || commonValues > bestMatchLength) {
          bestMatch = user.name;
          bestMatchId = user.uid;
          bestMatchLength = commonValues;
        }
      }
    }
    taskMatchId = task._id;
    //task.assignee = bestMatch;
    //task.isAssigned = true;
    //const user = users.find((user) => user.name === bestMatch);
    //user.tasks_assigned.push({ _id: task._id });
    resArray.push({ taskid: taskMatchId,usermatch: bestMatch, userid: bestMatchId });
  }
  //return { users, tasks };
  return resArray;
};


// //SECOND APPROACH
// export const taskAssigner = (users, tasks) => {
//   // Make a copy of the users and tasks arrays
//   const usersCopy = users.slice();
//   const tasksCopy = tasks.slice();
  
//   // Build a lookup table that maps each skill to the users that have that skill
//   const skillToUsers = new Map();
//   for (const user of usersCopy) {
//     for (const skill of user.skills) {
//       if (!skillToUsers.has(skill)) {
//         skillToUsers.set(skill, []);
//       }
//       skillToUsers.get(skill).push(user);
//     }
//   }

//   // Filter out unassigned tasks
//   const unassignedTasks = tasksCopy.filter((task) => !task.isAssigned);

//   // Assign each unassigned task to the best matching user
//   for (const task of unassignedTasks) {
//     const taskSkills = task.taskSkills;
//     let bestMatch = null;
//     let bestMatchLength = null;
//     for (const skill of taskSkills) {
//       const usersWithSkill = skillToUsers.get(skill) || [];
//       for (const user of usersWithSkill) {
//         const commonValues = taskSkills.filter(value => user.skills.includes(value)).length;
//         if (bestMatch === null || commonValues > bestMatchLength) {
//           bestMatch = user.name;
//           bestMatchLength = commonValues;
//         }
//       }
//     }
//     task.assignee = bestMatch;
//     task.isAssigned = true;
//     const user = usersCopy.find((user) => user.name === bestMatch);
//     user.tasks_assigned.push({'_id':task._id});
//   }
  
//   // Return the copied tasks array
//   return tasksCopy;
// };

  
  
  // //another approach - this is without making a users, tasks copy 
  // export const taskAssigner = (users, tasks) => {
  //   // Build a lookup table that maps each skill to the users that have that skill
  //   const skillToUsers = new Map();
  //   for (const user of users) {
  //     for (const skill of user.skills) {
  //       if (!skillToUsers.has(skill)) {
  //         skillToUsers.set(skill, []);
  //       }
  //       skillToUsers.get(skill).push(user);
  //     }
  //   }
  
  //   // Filter out unassigned tasks
  //   const unassignedTasks = tasks.filter((task) => !task.isAssigned);
  
  //   // Assign each unassigned task to the best matching user
  //   for (const task of unassignedTasks) {
  //     const taskSkills = task.taskSkills;
  //     let bestMatch = null;
  //     let bestMatchLength = null;
  //     for (const skill of taskSkills) {
  //       const usersWithSkill = skillToUsers.get(skill) || [];
  //       for (const user of usersWithSkill) {
  //         const commonValues = taskSkills.filter(value => user.skills.includes(value)).length;
  //         if (bestMatch === null || commonValues > bestMatchLength) {
  //           bestMatch = user.name;
  //           bestMatchLength = commonValues;
  //         }
  //       }
  //     }
  //     task.assignee = bestMatch;
  //     task.isAssigned = true;
  //     const user = users.find((user) => user.name === bestMatch);
  //     user.tasks_assigned.push({'_id':task._id});
  //   }
  //   return tasks
  // };
  


//MOCK DATA
// const users = [
//     {
//       uid: 1,
//       name: "Frank the Front End",
//       skills: ["HTML", "CSS", "Javascript", "ReactJS"],
//       tasks_assigned: []
//     },
//     {
//       uid: 2,
//       name: "Bob the Back End",
//       skills: ["MongoDB", "Python", "Javascript", "Django", "ExpressJS"],
//       tasks_assigned: []
//     },
//     {
//       uid: 3,
//       name: "Dave the Databaser",
//       skills: ["SQL", "Python", "C++", "MongoDB", "R"],
//       tasks_assigned: []
//     },
//     {
//       uid: 4,
//       name: "Charlie the C-er",
//       skills: ["SQL", "C++", "C", "C#", "Java"],
//       tasks_assigned: []
//     },
//     {
//       uid: 5,
//       name: "Stacy the Statician",
//       skills: ["C#", "R", "Excel", "MachineLearning", "Python"],
//       tasks_assigned: []
//     }
//   ];
  
  // const tasks = [
  //   {
  //     _id: "1",
  //     type_id: "1",
  //     isAssigned: true,
  //     title: "Assigned Task 1",
  //     description: "complete the front end",
  //     progt: 2,
  //     taskSkills: [],
  //     priority: "High",
  //     assignee: "Bob Tom"
  //   },
  //   {
  //     _id: "2",
  //     type_id: "2",
  //     isAssigned: true,
  //     title: "Assigned Task 2",
  //     description: "complete the test",
  //     progt: 4,
  //     taskSkills: [],
  //     priority: "Med",
  //     assignee: "Tom Bob"
  //   },
  //   {
  //     _id: "3",
  //     type_id: "3",
  //     isAssigned: true,
  //     title: "Assigned Task 3 ",
  //     description: "complete the front end",
  //     progt: 10,
  //     taskSkills: [],
  //     priority: "Low",
  //     assignee: "Sam Tam"
  //   },
  //   {
  //     _id: "4",
  //     type_id: "3",
  //     isAssigned: true,
  //     title: "Assigned Task 4 ",
  //     description: "complete the back end",
  //     progt: 12,
  //     taskSkills: [],
  //     priority: "High",
  //     assignee: "Tam Sam"
  //   },
  //   {
  //     _id: "5",
  //     type_id: "2",
  //     isAssigned: true,
  //     title: "Assigned Task 5 ",
  //     description: "complete the front end",
  //     progt: 5,
  //     taskSkills: [],
  //     priority: "Med",
  //     assignee: "John Jerry"
  //   },
  
  //   {
  //     _id: "6",
  //     type_id: "1",
  //     isAssigned: false,
  //     title: "This Should be Stacy",
  //     description: "Statistics Stuff",
  //     progt: 5,
  //     taskSkills: ["R", "Excel", "MachineLearning"],
  //     priority: "Low",
  //     assignee: ""
  //   },
  //   {
  //     _id: "7",
  //     type_id: "1",
  //     isAssigned: false,
  //     title: "This should be Charlie",
  //     description: "Do something with C++",
  //     progt: 5,
  //     taskSkills: ["C++"],
  //     priority: "Low",
  //     assignee: ""
  //   },
  //   {
  //     _id: "8",
  //     type_id: "1",
  //     isAssigned: false,
  //     title: "This Should be Frank",
  //     description: "Develop a Login UI",
  //     progt: 10,
  //     taskSkills: ["HTML", "CSS", "Javascript"],
  //     priority: "Med",
  //     assignee: ""
  //   },
  //   {
  //     _id: "9",
  //     type_id: "1",
  //     isAssigned: false,
  //     title: "This should be Bob",
  //     description: "Develop API to fecth data from MongoDB",
  //     progt: 4,
  //     taskSkills: ["MongoDB", "Javascript", "ExpressJS"],
  //     priority: "Low",
  //     assignee: ""
  //   },
  //   {
  //     _id: "10",
  //     type_id: "1",
  //     isAssigned: false,
  //     title: "This Should be Dave",
  //     description: "Create Schema for the SQL/noSQL DBs",
  //     progt: 5,
  //     taskSkills: ["SQL", "MongoDB"],
  //     priority: "High",
  //     assignee: ""
  //   }
  // ];
  