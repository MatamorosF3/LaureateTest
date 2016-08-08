'use strict';

class PageController {
  //end-non-standard

  //start-non-standard
  constructor(Auth, $scope) {
    this.$scope = $scope;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  $onInit(){
    this.$scope.contentHtml = '<div style="border: 1px solid red;">Francisco</div>';
  }

}

angular.module('laureateTestApp')
  .controller('PageController', PageController);
