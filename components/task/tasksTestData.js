export const tasks = [
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
  
  
  
  export const users = [
      {
        uid: 1,
        teamId: 1,
        name: "Frank the Front End",
        skills: ["HTML", "CSS", "Javascript", "ReactJS"],
        tasks_assigned: []
      },
      {
        uid: 2,
        teamId: 1,
        name: "Bob the Back End",
        skills: ["MongoDB", "Python", "Javascript", "Django", "ExpressJS"],
        tasks_assigned: []
      },
      {
        uid: 3,
        teamId: 1,
        name: "Dave the Databaser",
        skills: ["SQL", "Python", "C++", "MongoDB", "R"],
        tasks_assigned: []
      },
      {
        uid: 4,
        teamId: 1,
        name: "Charlie the C-er",
        skills: ["SQL", "C++", "C", "C#", "Java"],
        tasks_assigned: []
      },
      {
        uid: 5,
        teamId: 1,
        name: "Stacy the Statician",
        skills: ["C#", "R", "Excel", "MachineLearning", "Python"],
        tasks_assigned: []
      }
    ];

    export const projTeam = [
      {
        teamId: 1,
        teamName: 'CSE 4550',
        teamMembers: [1,2,3,4,5]
      }
    ];

    export const Sprint = [
      {
        sprintId: 1,
        teamId: 1,
        tasksInSprint: ["1", "2","3","4","5"],
        startDate: "01-01-2023",
      }
    ]