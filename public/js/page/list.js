fantastic.controller('ListController', function($scope, $http, $log, _){
  $scope.posts = [];
  var urlParams = location.href.split("?")[1].split("&");
  var urlParamsMap = {};
  for (var i = urlParams.length - 1; i >= 0; i--) {
      urlParamsMap[urlParams[i].split("=")[0]] = urlParams[i].split("=")[1];
  };
  $scope.tag = urlParamsMap["tag"];

  var logError = function(data, status) {
    $log.log('code '+status+': '+data);
  };
  $scope.loading = true;
  var init = function() {
    return $http.get('/tag/getTagsByTag',{params: {tag: $scope.tag }}).
      success(function(data) {
        $log.info("data:",data)
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
