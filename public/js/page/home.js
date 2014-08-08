fantastic.controller('HomeController', function($scope, $http, $log, _){
  $scope.posts = [];

  var logError = function(data, status) {
    $log.log('code '+status+': '+data);
  };

  var init = function() {
    return $http.get('/app/getAllPosts').
      success(function(data) {
        _.each(data, function(v,k){
            console.log(v.Stamp);
            v.Date = moment(parseInt(v.Stamp)).fromNow();
        });
        $scope.posts = data;
      }).
      error(logError);
  };
  init();

})
