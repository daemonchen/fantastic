fantastic.controller('PostController', function($scope, $http, $log, _) {
    // $scope.post = [];
    var urlParams = location.href.split("?")[1].split("&");
    var urlParamsMap = {};
    for (var i = urlParams.length - 1; i >= 0; i--) {
        urlParamsMap[urlParams[i].split("=")[0]] = urlParams[i].split("=")[1];
    };
    $scope.stamp = urlParamsMap["stamp"];
    $scope.loading = true;
    $scope.comments = [];

    $scope.getPreview = function(){
        $http.post('/comment/preview', {
            CommentText: $scope.newComment
        }).
        error($scope.logError).
        success($scope.renderPreview);
    }

    $scope.renderPreview = function(result){
        $log.info(result);
        $scope.preview = result
    }



    $scope.clear = function(){
        $scope.newComment = "";
    }

    $scope.sendComment = function() {
        $scope.commentData = {
          RelativeStamp: $scope.stamp,
          UserName: $scope.username || "游客",
          UserEmail: $scope.email,
          CommentText: $scope.newComment
        }
        if (!$scope.newComment) {return console.log("$scope.newComment is :",$scope.newComment);};
        $http.post('/comment/save', $scope.commentData).
        error($scope.logError).
        success(pageUtil.getComments);
    }

    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };

    var pageUtil = {
        init: function() {
        // $log.info($scope.islogin);
            this.getPost();
        },
        getPost: function(){
            var self = this;
            $http.get('/post/getPostByStamp', {
                params: {
                    stamp: $scope.stamp
                }
            }).
            success(function(data) {
                if (!!data && data.length != 0 && data != "null") {
                    $scope.time = moment(parseInt(data.Stamp)).format("YYYY年MM月DD日  HH:mm:ss");
                    $scope.post = data;
                    $scope.loading = false;
                    self.getComments();

                };
            }).
            error($scope.logError);

        },
        getComments: function(){
            $http.get('/comment/getCommentsByStamp', {
                params: {
                    stamp: $scope.stamp
                }
            }).
            success(function(data) {
                if (!!data && data.length != 0 && data != "null") {
                    _.each(data, function(v,k){
                        v.Date = moment(parseInt(v.CommentTime)).fromNow();
                    });
                    $scope.comments = data || []
                    $scope.clear();

                };
                $log.log("data",data);
            }).
            error($scope.logError);
        }

    }
    pageUtil.init();

})