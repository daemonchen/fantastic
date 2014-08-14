fantastic.controller('HomeController', function($scope, $http, $log, _){
  $scope.posts = [];

  var logError = function(data, status) {
    $log.log('code '+status+': '+data);
  };
  $scope.loading = true;
  var init = function() {
    return $http.get('/app/getAllPosts').
      success(function(data) {
        if (!!data && data.length != 0 && data != "null") {
            _.each(data, function(v,k){
                v.Date = moment(parseInt(v.Stamp)).fromNow();
            });
            $scope.posts = data;
            $scope.loading = false;

        };
      }).
      error(logError);
  };
  init();

})
