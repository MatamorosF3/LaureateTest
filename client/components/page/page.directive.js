'use strict';

angular.module('laureateTestApp')
  .directive('page2', () => ({
    templateUrl: 'components/page/page2.html',
    restrict: 'E',
    controller: 'PageController',
    controllerAs: 'page'
  }));
