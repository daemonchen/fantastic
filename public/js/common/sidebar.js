fantastic.controller('ArchiveSidebarController', function($scope, $http, $log, _, postService) {

    $scope.loading = true;
    $log.info(postService.getPosts());

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