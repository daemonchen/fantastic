fantastic.controller('PostController', function($scope, $location, $http, $log, _){
  // $scope.post = [];
  $scope.stamp = $location.search()['stamp'];
  var logError = function(data, status) {
    $log.log('code '+status+': '+data);
  };
  $scope.loading = true;
  var init = function() {
    return $http.get('/post/getPostByStamp',{params: {stamp: $scope.stamp }}).
      success(function(data) {
        $log.info('data',data);
        if (!!data && data.length != 0 && data != "null") {
            $scope.time = moment(parseInt(data.Stamp)).format("YYYY年MM月DD日  HH:mm:ss");
            $scope.post = data;
            $scope.loading = false;

        };
      }).
      error(logError);
  };
  init();

})
