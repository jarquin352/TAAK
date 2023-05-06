
//Old Data
(function() {
  var tasks = [
  {
    tid: 1,
    type_id: 1,
    sprintid: 1,
    isAssigned: true,
    title: "TAAK Task Assigner Button",
    description: "Button for adding task is broken upon DOM data loading.",
    progt: 2,
    taskSkills: ['Javascript', 'ReactJS', 'HTML'],
    priority: "High",
    assignee: 5
  },
  {
    tid: 2,
    type_id: 2,
    sprintid: 1,
    isAssigned: true,
    title: "Assigned Task 2",
    description: "complete the test",
    progt: 4,
    taskSkills: [],
    priority: "Med",
    assignee: 4
  },
  {
    tid: 3,
    type_id: 3,
    sprintid: 1,
    isAssigned: true,
    title: "Assigned Task 3 ",
    description: "complete the front end",
    progt: 10,
    taskSkills: [],
    priority: "Low",
    assignee: 3
  },
  {
    tid: 4,
    type_id: 3,
    sprintid: 1,
    isAssigned: true,
    title: "Assigned Task 4 ",
    description: "complete the back end",
    progt: 12,
    taskSkills: [],
    priority: "High",
    assignee: 2
  },
  {
    tid: 5,
    type_id: 2,
    sprintid: 1,
    isAssigned: true,
    title: "Assigned Task 5 ",
    description: "complete the front end",
    progt: 5,
    taskSkills: [],
    priority: "Med",
    assignee: 1
  },

  {
    tid: 6,
    type_id: 1,
    sprintid: 1,
    isAssigned: false,
    title: "This Should be Stacy",
    description: "Statistics Stuff",
    progt: 5,
    taskSkills: ["R", "Excel", "MachineLearning"],
    priority: "Low",
    assignee: null
  },
  {
    tid: 7,
    type_id: 1,
    sprintid: 1,
    isAssigned: false,
    title: "This should be Charlie",
    description: "Do something with C++",
    progt: 5,
    taskSkills: ["C++", "C"],
    priority: "Low",
    assignee: null
  },
  {
    tid: 8,
    type_id: 1,
    sprintid: 1,
    isAssigned: false,
    title: "This Should be Frank",
    description: "Develop a Login UI",
    progt: 10,
    taskSkills: ["HTML", "CSS", "Javascript"],
    priority: "Med",
    assignee: null
  },
  {
    tid: 9,
    type_id: 1,
    sprintid: 1,
    isAssigned: false,
    title: "This should be Bob",
    description: "Develop API to fecth data from MongoDB",
    progt: 4,
    taskSkills: ["MongoDB", "Javascript", "ExpressJS"],
    priority: "Low",
    assignee: null
  },
  {
    tid: 10,
    type_id: 1,
    sprintid: 1,
    isAssigned: false,
    title: "This Should be Dave",
    description: "Create Schema for the SQL/noSQL DBs",
    progt: 5,
    taskSkills: ["SQL", "MongoDB"],
    priority: "High",
    assignee: null
  }
];



 var users = [
    {
      uid: 1,
      authid:1,
      isAdmin: false,
      teamid: 1,
      name: "Frank the Front End",
      skills: ["HTML", "CSS", "Javascript", "ReactJS"],
      tasks_assigned: []
    },
    {
      uid: 2,
      authid:2,
      isAdmin: false,
      teamid: 1,
      name: "Bob the Back End",
      skills: ["MongoDB", "Python", "Javascript", "Django", "ExpressJS"],
      tasks_assigned: []
    },
    {
      uid: 3,
      authid:3,
      isAdmin: false,
      teamid: 1,
      name: "Dave the Databaser",
      skills: ["SQL", "Python", "C++", "MongoDB", "R"],
      tasks_assigned: []
    },
    {
      uid: 4,
      authid:4,
      isAdmin: false,
      teamid: 1,
      name: "Charlie the C-er",
      skills: ["SQL", "C++", "C", "C#", "Java"],
      tasks_assigned: []
    },
    {
      uid: 5,
      authid:5,
      isAdmin: false,
      teamid: 1,
      name: "Stacy the Statician",
      skills: ["C#", "R", "Excel", "MachineLearning", "Python"],
      tasks_assigned: []
    },
    {
      uid: 6,
      authid:6,
      isAdmin: true,
      teamid: 1,
      name: "Adam the Admin",
      skills: ["Word", "Excel", "Jira","Python"],
      tasks_assigned: []
    }
  ];

   var projTeam = [
    {
      teamid: 1,
      teamName: 'CSE 4550',
      teamMembers: [1,2,3,4,5],
      teamCode: 1231231
    }
  ];

   var sprints = [
    {
      sprintd: 1,
      teamid: 1,
      tasksInSprint: ["1", "2","3","4","5"],
      startDate: "01-01-2023",
      endDate: "01-14-2023"
    }
  ]

  var authentication = [
    {
      authid: 1,
      email: 'frank@taak.com',
      password: 'password1'
    },

    {
      authid: 2,
      email: 'bob@taak.com',
      password: 'password1'
    },

    {
      authid: 3,
      email: 'dave@taak.com',
      password: 'password1'
    },

    {
      authid: 4,
      email: 'charlie@taak.com',
      password: 'password1'
    },
    {
      authid: 5,
      email: 'stacy@taak.com',
      password: 'password1'
    },
    {
      authid: 6,
      email: 'adamadmin@taak.com',
      password: 'password1'
    }
  ]

  var announcements = [
    {'a_id':1,'type_id':1,'teamid':1,'title':'Announcement 1','owner':'Adam Admin - PM', 'dueDate':'2023-01-31', 'description':'Announcement description 1'},
    {'a_id':2,'type_id':2,'teamid':1,'title':'Announcement 2','owner':'Adam Admin - PM', 'dueDate':'2023-01-31','description':'Announcement description 2'},
    {'a_id':3,'type_id':3,'teamid':1,'title':'Announcement 3','owner':'Adam Admin - PM', 'dueDate':'2023-01-31','description':'Announcement description 3'}
  ];

  var taskTypes = [
    {"_id":1, 'name':'Icebox','class':'icebox','color':'#ab47bc'},
    {"_id":2, 'name':'Backlog','class':'backlog','color':'#42a5f5'},
    {"_id":3, 'name':'To Do','class':'todo','color':'error.dark'},
    {"_id":4, 'name':'In Progress','class':'inprogress','color':'warning.dark'},
    {"_id":5, 'name':'Done','class':'done','color':'success.dark'}
  ];

  var tasksModel = function(){
    return tasks
  };

  var usersModel = function(){
    return users
  };

  var projTeamModel = function(){
    return projTeam
  };

  var sprintsModel = function(){
    return sprints
  };

  var authenticationModel = function(){
    return authentication
  }

  var announcementsModel = function(){
    return announcements
  }

  var taskTypesModel = function(){
    return taskTypes
  }
  
  var taakmodels = {
    tasksModel:tasksModel,
    usersModel:usersModel,
    projTeamModel:projTeamModel,
    sprintsModel:sprintsModel,
    authenticationModel: authenticationModel,
    announcementsModel:announcementsModel,
    taskTypesModel:taskTypesModel
  };

  if( typeof exports !== 'undefined' ) {
    exports.taakmodels = taakmodels;
 } else {
    window.taakmodels = taakmodels;
 }

})();
