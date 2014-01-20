/*
 Copyright 2011 The Go Authors.  All rights reserved.
 Use of this source code is governed by a BSD-style
 license that can be found in the LICENSE file.
*/

angular.module("fantastic",[]).config(function($interpolateProvider){
   $interpolateProvider.startSymbol('[[');
   $interpolateProvider.endSymbol(']]');
   // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
})

function TaskCtrl($scope, $http, $log) {
  $scope.tasks = [];
  $scope.working = false;

  var logError = function(data, status) {
    $log.log('code '+status+': '+data);
    $scope.working = false;
  };

  var refresh = function() {
    return $http.get('/task/').
      success(function(data) {
        $scope.tasks = data.Tasks;
      }).
      error(logError);
  };

  $scope.addTodo = function() {
    $scope.working = true;
    $http.post('/task', {content: $scope.todoText, done: false}).
      error(logError).
      success(function() {
        refresh().then(function() {
          $scope.working = false;
          $scope.todoText = '';
        })
      });
  };

  $scope.toggleDone = function(task) {
    data = {ID: task.ID, Title: task.Title, Done: !task.Done}
    $http.put('/task/', data).
      error(logError).
      success(function() {
        task.Done = !task.Done ;
        $log.log("update success",task)
      });
  };

  refresh().then(function() { $scope.working = false; });
}