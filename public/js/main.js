var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

var fantastic = angular.module("fantastic", ["underscore", "ngSanitize"])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    })

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