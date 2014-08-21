var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

var fantastic = angular.module("fantastic", ["underscore", "ngSanitize"])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    })

/*----define my own service---*/
fantastic.service('postService', function() {
    var posts = null;
    var addPosts = function(data){
        posts = data
        console.log("a",posts);
    };
    var getPosts = function(){
        console.log(posts);
        return posts;
    };
    return {
        addPosts: addPosts,
        getPosts: getPosts
    }
})
/*------define my own directive------*/
fantastic.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });