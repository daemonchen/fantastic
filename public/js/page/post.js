fantastic.controller('PostController', function($scope, $http, $log, _){
  // $scope.post = [];
  var urlParams = location.href.split("?")[1].split("&");
  var urlParamsMap = {};
  for (var i = urlParams.length - 1; i >= 0; i--) {
      urlParamsMap[urlParams[i].split("=")[0]] = urlParams[i].split("=")[1];
  };
  $scope.stamp = urlParamsMap["stamp"];
  var logError = function(data, status) {
    $log.log('code '+status+': '+data);
  };
  $scope.loading = true;
  var init = function() {
    $log.info($scope.islogin);
    return $http.get('/post/getPostByStamp',{params: {stamp: $scope.stamp }}).
      success(function(data) {
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
