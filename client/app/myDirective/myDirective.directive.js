'use strict';

angular.module('laureateTestApp')
  .directive('myDirective', function ($compile) {
    return {
      //template: '<div></div>',
      restrict: 'A',
      replace: true,
      link: function (scope, element, attrs) {
        scope.$watch(attrs.myDirective, function(html) {
          element.html(html);
          $compile(element.contents())(scope);
});
      }
    };
  }).controller('DemoController',function($scope){
      $scope.click = function(arg){
        alert("Clicked");
      }

     $scope.html = '<div>\r\n\tEsto es una prueba de texto.\r\n\r\n\tfavor no molestar.\r\n</div>';
  });
