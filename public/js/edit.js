fantastic.controller('EditorController', function($scope, $http, $log, _) {

    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    // init stuff
    $scope.title = window.localStorage.getItem("edittingArticleTitle");
    $scope.content = window.localStorage.getItem("edittingArticleContent");
    $scope.tags = window.localStorage.getItem("edittingArticleTags") ? window.localStorage.getItem("edittingArticleTags").split(",") : [];

    // bind change event on tag model
    $scope.addTag = function(tag) {
        $scope.tags.push(tag);
        window.localStorage.setItem("edittingArticleTags", $scope.tags);
        $scope.tag = "";
    }
    // bind change event on title model
    $scope.setTitle = function(title) {
        window.localStorage.setItem("edittingArticleTitle", title);
    }

    // bind change event on content model
    $scope.setContent = function(content) {
        window.localStorage.setItem("edittingArticleContent", content);
    }

    $scope.saveTags = function(result) {
        $log.info(result);
        if ($scope.tags.length == 0) {
            return $scope.clean();
        };
        for (var i = $scope.tags.length - 1; i >= 0; i--) {
            $scope.saveTag($scope.tags[i], result.data);
        };
    },
    $scope.saveTag = function(tag, stamp) {
        $http.post('/tag/save', {
            title: $scope.title,
            stamp: stamp,
            tag: tag
        }).
        error($scope.logError).
        success($scope.clean);

    },
    $scope.clean = function() {
        window.localStorage.clear();

    }
    // bind click event on submit btn
    $scope.sendPost = function() {
        $log.info({
            title: $scope.title,
            content: $scope.content
        });
        $http.post('/edit/post', {
            title: $scope.title,
            content: $scope.content
        }).
        error($scope.logError).
        success($scope.saveTags);
    }

})