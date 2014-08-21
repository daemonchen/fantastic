fantastic.controller('RegisterController', function($scope, $http, $log, _) {
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };

    $scope.login = function() {
        return $http.post('/admin/register', {
            params: {
                username: $scope.username,
                password: $scope.password
            }
        }).
        success(function() {
            window.location.href = "/";
        }).
        error($scope.logError);
    }
})