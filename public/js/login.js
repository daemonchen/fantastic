fantastic.controller('LoginController', function($scope, $http, $log, _) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };

    $scope.login = function() {
        return $http.get('/admin/login', {
            params: {
                username: $scope.username,
                password: MD5($scope.password)
            }
        }).
        success(function() {
            window.location.href = "/";
        }).
        error($scope.logError);
    }
})