
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