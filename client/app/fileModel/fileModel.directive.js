'use strict';

angular.module('laureateTestApp')
  .directive('fileReader', function ($http) {
    return {
      scope: {
      fileReader:"="
    },
      link: function (scope, element, attrs) {

        $(element).on('change', function(changeEvent) {

          var files = changeEvent.target.files;

          if (files.length) {
              var files2 = files[0].name;
            console.log("HELLO"    + files2    );
            var r = new FileReader();
            r.onload = function(e) {
            var contents = e.target.result;

            scope.$apply(function () {
              var str =contents;
                  console.log("HELLO");
              scope.estado = 'Jose Jose';
              scope.fileReader = {name:files2, info:contents};

            });


        };

        r.readAsText(files[0], 'ISO-8859-1');
      }

    });

      }
    };
  });
