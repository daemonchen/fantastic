var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

var fantastic = angular.module("fantastic", ["underscore","ngSanitize"])
    .config(function($interpolateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    })