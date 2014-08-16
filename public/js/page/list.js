fantastic.controller('ListController', function($scope, $http, $log, _){
  $scope.posts = [];

  var logError = function(data, status) {
    $log.log('code '+status+': '+data);
  };
  $scope.loading = true;
  $scope.tag = $("#hiddenTag").html();
  var init = function() {
    return $http.get('/tag/getByTag',{params: {tag: $scope.tag }}).
      success(function(data) {
        $log.info()
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
