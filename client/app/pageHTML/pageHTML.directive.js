'use strict';

angular.module('laureateTestApp')
  .directive('pageHTML', function () {
    return {
      templateUrl: 'app/pageHTML/pageHTML.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
