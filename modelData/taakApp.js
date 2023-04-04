'use strict';

/*
 * Load the model data of the problem 2 of CSE4050's project5.
 * We load into the property taskModels.taskModel
 *
 */

(function() {
  
  var tasksOverview = [
    {'id':'1','title':'TEST 1','priority':'High','asignees':'Tom Bob','term':'LONG TERM','status':'complete','dueDate':'12/12/1222'},
    {'id':'2','title':'TEST 2','priority':'LOW','asignees':'Bob Tom','term':'SHORT TERM','status':'INCOMPLETE','dueDate':'12/12/1222'}
    ];

    var tasks = [
      {"_id":"1", "type_id":"1",'isAssigned':true, "title":"Complete Task 1",'description':'complete the front end','progt':2,'taskSkills':['Machine Learning', 'Web Development'],priority: 'High', assignee: 'Bob Tom'},
      {"_id":"2", "type_id":"2",'isAssigned':true, "title":"Complete Task 2",'description':'complete the test','progt':4,'taskSkills':['Machine Learning', 'Full Stack'],priority: 'Med', assignee: 'Bob Tom'},
      
      {"_id":"3", "type_id":"3",'isAssigned':true,"title":"Complete Task 3 ",'description':'complete the front end','progt':10,'taskSkills':['UI/UX', 'Object Oriented Programming'],priority: 'Low', assignee: 'Sam Tam'},
      {"_id":"4", "type_id":"3",'isAssigned':true, "title":"Complete Task 4 ",'description':'complete the back end','progt':12,'taskSkills':['Machine Learning'],priority: 'High', assignee: 'Tam Sam'},
      {"_id":"5", "type_id":"2",'isAssigned':true, "title":"Complete Task 5 ",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', 'Web Development','UI/UX'],priority: 'Med', assignee: 'John Jerry'},
    
      {"_id":"6", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 1",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', ' Web Development',' UI/UX'],priority: 'Med', assignee: ''},
      {"_id":"7", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 2",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', ' OOP',' UI/UX'],priority: 'Low', assignee: ''},
      {"_id":"8", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 3",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', ' SQL',' Python'],priority: 'High', assignee: ''},
      {"_id":"9", "type_id":"1",'isAssigned':false, "title":"Unassigned Task 4",'description':'complete the front end','progt':5,'taskSkills':['Machine Learning', ' R',' Excel'],priority: 'Low', assignee: ''},
    ];
  var taskTypes = [
       {"_id":"1", 'name':'New','class':'new','color':'error.dark'},
       {"_id":"2", 'name':'In Progress','class':'inprogress','color':'warning.dark'},
       {"_id":"3", 'name':'Done','class':'done','color':'success.dark'}
    ];

  // var pendingTasks =[
  //   { id: 1, status: 'Pending', name: 'Complete Front End', priority: 'High', assignee: '' },
  //   { id: 2, status: 'In Progress', name: 'Complete SRS', priority: 'Medium', assignee: '' },
  //   { id: 3, status: 'Pending', name: 'Complete SPMP', priority: 'Low', assignee: '' },
  //   { id: 4, status: 'Completed', name: 'Graduate', priority: 'High', assignee: '' },
  // ];
  var announcements = [
      {"_id":'1','type_id':'1','anTitle':'Finish The Front End','owner':'Tom Sam', 'dueDate':'12/1/2023', 'description':'this needs to be done by [xyz]'},
      {"_id":'2','type_id':'2','anTitle':'Finish the Back End','owner':'Bob Sam', 'dueDate':'12/1/2023','description':'major progress done on [xyz]'},
      {"_id":'3','type_id':'3','anTitle':'Turn in Work','owner':'Slom Sam', 'dueDate':'12/1/2023','description':'good progress so far on...'}
    ];

  
  var users = [
    {"uid": 1, "name": "Alice", "skills": ["Machine Learning", "Web Development"], "tasks_assigned": []},
    {"uid": 2, "name": "Bob", "skills": ["Machine Learning", "Full Stack"], "tasks_assigned": []},
    {"uid": 3, "name": "Charlie", "skills": ["UI/UX", "Object Oriented Programming"], "tasks_assigned": []},
    {"uid": 4, "name": "Dave", "skills": ["Machine Learning"], "tasks_assigned": []},
    {"uid": 5, "name": "Eve", "skills": ["Machine Learning", "Web Development", "UI/UX"], "tasks_assigned": []},
    {"uid": 6, "name": "Frank", "skills": ["Machine Learning", "OOP", "UI/UX"], "tasks_assigned": []},
    {"uid": 7, "name": "Grace", "skills": ["Machine Learning", "SQL", "Python"], "tasks_assigned": []},
    {"uid": 8, "name": "Heidi", "skills": ["Machine Learning", "R", "Excel"], "tasks_assigned": []},
]
   /*Potential objects: users, team? */
   var teams = [
    {"_id":"1", 'name':'taak', 'members':['uid']}
   ]

/* ---------------------------Functions-------------------------------------------------------------- */
  var taskListModel = function() {
     return tasks;
  };

  var taskTypeListModel = function() {
     return taskTypes;
  };

  var announcementsModel = function() {
     return announcements;
  };

  var tasksOverviewModel = function() {
    return tasksOverview;
  };

  var usersModel = function(){
    return users;
  };

  var teamsModel = function(){
    return teams;
  };

  // var pendingTasksModel = function(){
  //   return pendingTasks
  // };
/*--------------------------JSON Object Model------------------------------------ */
  var taskModels =  {
     taskListModel: taskListModel,
     taskTypeListModel: taskTypeListModel,
     announcementsModel:announcementsModel,
     tasksOverviewModel: tasksOverviewModel,
     usersModel: usersModel,
     teamsModel: teamsModel,
    //  pendingTasksModel:pendingTasksModel

  };

  if( typeof exports !== 'undefined' ) {
     // We're being loaded by the Node.js module loader ('require') so we use its
     // conventions of returning the object in exports.
     exports.taskModels = taskModels;
  } else {
     // We're not in the Note.js module loader so we assume we're being loaded
     // by the browser into the DOM.
     window.taskModels = taskModels;
  }

})()
