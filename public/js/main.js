var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

var fantastic = angular.module("fantastic", ["underscore","ngSanitize"])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    })