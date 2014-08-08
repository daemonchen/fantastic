var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._;
});

var fantastic = angular.module("fantastic",["underscore"]).config(function($interpolateProvider){
   $interpolateProvider.startSymbol('[[');
   $interpolateProvider.endSymbol(']]');
   // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
})