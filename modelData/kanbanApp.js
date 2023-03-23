'use strict';

/*
 * Load the model data of the problem 2 of CSE4050's project5.
 * We load into the property taskModels.taskModel
 *
 */

(function() {

  var tasks = [
      {"_id":"1", "type_id":"1", "title":"Complete Task 1",'description':'complete the front end'},
      {"_id":"2", "type_id":"2", "title":"Complete Task 2",'description':'complete the back end'},
      {"_id":"3", "type_id":"3", "title":"Complete Task 3 ",'description':'complete the front end'},
      {"_id":"4", "type_id":"3", "title":"Complete Task 4 ",'description':'complete the back end'},
      {"_id":"5", "type_id":"2", "title":"Complete Task 5 ",'description':'complete the front end'},
    ];

  var taskTypes = [
       {"_id":"1", 'name':'New','class':'new','color':'error.dark'},
       {"_id":"2", 'name':'In Progress','class':'inprogress','color':'warning.dark'},
       {"_id":"3", 'name':'Done','class':'done','color':'success.dark'}
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
