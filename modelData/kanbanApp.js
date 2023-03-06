'use strict';

/*
 * Load the model data of the problem 2 of CSE4050's project5.
 * We load into the property taskModels.taskModel
 *
 */

(function() {

  var tasks = [
      {"_id":"1", "type_id":"1", "description":"Complete Task 1"},
      {"_id":"2", "type_id":"2", "description":"Complete Task 2"},
      {"_id":"3", "type_id":"3", "description":"Complete Task 3 "},
      {"_id":"4", "type_id":"3", "description":"Complete Task 4 "},
      {"_id":"5", "type_id":"2", "description":"Complete Task 5 "},
    ];

  var taskTypes = [
       {"_id":"1", 'name':'New','class':'new','color':'warning.main'},
       {"_id":"2", 'name':'In Progress','class':'inprogress','color':'info.main'},
       {"_id":"3", 'name':'Done','class':'done','color':'success.main'}
     ];

  var taskListModel = function() {
     return tasks;
  };

  var taskTypeListModel = function() {
     return taskTypes;
  };


  var taskModels =  {
     taskListModel: taskListModel,
     taskTypeListModel: taskTypeListModel
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
