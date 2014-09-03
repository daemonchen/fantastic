fantastic.controller('ArchiveSidebarController', function($scope, $http, $log, _, postService) {

    $scope.loading = true;
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.loading = true;

    var commentUtil = {
        init: function() {
            this.getLatestComments();
        },
        getLatestComments: function() {
            var self = this;
            $http.get('/comment/getComments', {
                params: {
                    limit: 3
                }
            }).
            success(function(data) {
                console.log(data);
                (!!data) && (data.length != 0) && (data != "null") && self.renderComments(data);
            }).
            error($scope.logError);

        },
        renderComments: function(data) {
            _.each(data, function(v, k) {
                v.Date = moment(parseInt(v.CommentTime)).fromNow();
            });
            $scope.comments = data || []
            $scope.loading = false;


        }
    }


    commentUtil.init();

})

fantastic.controller('TagSidebarController', function($scope, $http, $log, _) {

    $scope.loading = true;
    $scope.logError = function(data, status) {
        $log.log('code ' + status + ': ' + data);
    };
    $scope.loading = true;

    var tagUtil = {
        init: function() {
            this.getAllTags();
        },
        getAllTags: function() {
            var self = this;
            $http.get('/tag/getAllTags').
            success(function(data) {
                (!!data) && (data.length != 0) && (data != "null") && self.renderTags(data);
            }).
            error($scope.logError);

        },
        renderTags: function(data) {
            var tagArray = _.uniq(_.pluck(data, 'Tag'));
            $scope.tags = [];
            for (var i = tagArray.length - 1; i >= 0; i--) {
                $scope.tags.push({
                    tag: tagArray[i],
                    count: _.where(data, {
                        Tag: tagArray[i]
                    }).length
                })
            };
            $scope.loading = false;


        }
    }


    tagUtil.init();

})