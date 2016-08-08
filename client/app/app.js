'use strict';

angular.module('laureateTestApp', ['laureateTestApp.auth', 'laureateTestApp.admin',
    'laureateTestApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'ui.bootstrap', 'validation.match', 'ngDialog'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
