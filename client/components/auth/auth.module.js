'use strict';

angular.module('laureateTestApp.auth', ['laureateTestApp.constants', 'laureateTestApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
