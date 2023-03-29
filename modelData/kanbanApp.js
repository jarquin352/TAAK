'use strict';

/*
 * Load the model data of the problem 2 of CSE4050's project5.
 * We load into the property taskModels.taskModel
 *
 */

(function() {

  var tasks = [
      {"_id":"1", "type_id":"1", "title":"Complete Task 1",'description':'complete the front end','progt':'3','taskSkills':['Machine Learning', 'Web Development']},
      {"_id":"2", "type_id":"2", "title":"Complete Task 2",'description':'complete the back end','progt':'4','taskSkills':['Machine Learning', 'Full Stack']},
      {"_id":"3", "type_id":"3", "title":"Complete Task 3 ",'description':'complete the front end','progt':'10','taskSkills':['UI/UX', 'Object Oriented Programming']},
      {"_id":"4", "type_id":"3", "title":"Complete Task 4 ",'description':'complete the back end','progt':'12','taskSkills':['Machine Learning']},
      {"_id":"5", "type_id":"2", "title":"Complete Task 5 ",'description':'complete the front end','progt':'5','taskSkills':['Machine Learning', 'Web Development','UI/UX']},
    ];

  var taskTypes = [
       {"_id":"1", 'name':'New','class':'new','color':'error.dark'},
       {"_id":"2", 'name':'In Progress','class':'inprogress','color':'warning.dark'},
       {"_id":"3", 'name':'Done','class':'done','color':'success.dark'}
    ];
   
  var announcements = [
      {"_id":'1','type_id':'1','anTitle':'Finish The Front End','owner':'Tom Sam', 'dueDate':'12/1/2023', 'description':'this needs to be done by [xyz]'},
      {"_id":'2','type_id':'2','anTitle':'Finish the Back End','owner':'Bob Sam', 'dueDate':'12/1/2023','description':'major progress done on [xyz]'},
      {"_id":'3','type_id':'3','anTitle':'Turn in Work','owner':'Slom Sam', 'dueDate':'12/1/2023','description':'good progress so far on...'}
    ];

  var tasksOverview = [
    {'id':'1','title':'TEST 1','priority':'High','asignees':'Tom Bob','term':'LONG TERM','status':'complete','dueDate':'12/12/1222'},
    {'id':'2','title':'TEST 2','priority':'LOW','asignees':'Bob Tom','term':'SHORT TERM','status':'INCOMPLETE','dueDate':'12/12/1222'}
    ];
  
  var users = [
   {'uid':'1', 'u_name':'first last', 'skills': ['Machine Learning', 'Web Development', 'Object Oriented Programming','UI/UX'],
    'availability':'Monday', 'task_assigned':['_id 1']} 

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

/*--------------------------JSON Object Model------------------------------------ */
  var taskModels =  {
     taskListModel: taskListModel,
     taskTypeListModel: taskTypeListModel,
     announcementsModel:announcementsModel,
     tasksOverviewModel: tasksOverviewModel,
     usersModel: usersModel,
     teamsModel: teamsModel

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
