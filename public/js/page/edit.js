fantastic.controller('EditorController', function($scope, $http, $log, _) {

    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    // init stuff
    $scope.title = window.localStorage.getItem("edittingArticleTitle");
    $scope.content = window.localStorage.getItem("edittingArticleContent");
    $scope.tags = window.localStorage.getItem("edittingArticleTags") ? window.localStorage.getItem("edittingArticleTags").split(",") : [];

    // bind preview stuff
    $scope.getPreview = function(){
        $http.post('/edit/preview', {
            content: $scope.content
        }).
        error($scope.logError).
        success($scope.renderPreview);
    }

    $scope.renderPreview = function(result){
        $log.info(result);
        $scope.preview = result
    }
    // bind change event on tag model
    $scope.addTag = function() {
        $scope.tags.push($scope.tag);
        window.localStorage.setItem("edittingArticleTags", $scope.tags);
        $scope.tag = "";
    }
    // bind change event on title model
    $scope.setTitle = function() {
        window.localStorage.setItem("edittingArticleTitle", $scope.title);
    }

    // bind change event on content model
    $scope.setContent = function() {
        window.localStorage.setItem("edittingArticleContent", $scope.content);
        $scope.getPreview()

    }

    $scope.saveTags = function(result) {
        $scope.stamp = result.Stamp
        if ($scope.tags.length == 0) {
            return $scope.clean();
        };
        for (var i = $scope.tags.length - 1; i >= 0; i--) {
            $scope.saveTag($scope.tags[i]);
        };
    },
    $scope.saveTag = function(tag) {
        $http.post('/tag/save', {
            title: $scope.title,
            stamp: $scope.stamp,
            tag: tag
        }).
        error($scope.logError).
        success($scope.clean);

    },
    $scope.clean = function() {
        window.location.href="/post/index?stamp="+$scope.stamp;
        window.localStorage.clear();

    }
    // bind click event on submit btn
    $scope.sendPost = function() {
        return $http.post('/edit/post', {
            title: $scope.title,
            content: $scope.content
        }).
        error($scope.logError).
        success($scope.saveTags);
    }

})