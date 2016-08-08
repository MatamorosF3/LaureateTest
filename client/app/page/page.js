'use strict';

angular.module('laureateTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('page', {
        url: '/page',
        template: '<page></page>',
        params: {
          params: null
        }
      });
  });
