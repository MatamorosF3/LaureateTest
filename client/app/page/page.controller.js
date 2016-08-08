'use strict';
(function(){

class PageComponent {
  constructor($scope, $http,  $stateParams, $parse) {
    this.message = 'Hello';
    this.$stateParams = $stateParams;
    this.$scope  = $scope;
    this.$http = $http;
    this.$parse = $parse;
    this.page = null;
    this.variables = [];
    this.globalInf = [];
    self = this;
  }

  $onInit(){
    this.$scope.htmlContent = '<div style="border:1px solid red;">Working fine</div>';
    console.log("LLEGAMOS22");
    this.$http.get('/api/pages/' + this.$stateParams.params._id)
        .then(response => {
          if (response.data.error) {
              console.log("Error");
          } else {
              this.page = response.data.userInput;
              console.log('page: ' + this.page);

              this.page.forEach(function(value, index){
                  console.log('VALUES ');
                  console.log(value.newName.replace(/{+|}+/g, '').trim());
                  var model = self.$parse(value.newName.replace(/{+|}+/g, '').trim().toString());
                  console.log('antes de asignar valor a la variable dinamica ' + value.userValue);
                  if(value.userValue === null || value.userValue === '' || value.userValue === undefined){
                    model.assign(self.$scope, value.originalName);
                  }else{
                  model.assign(self.$scope, value.userValue);
                }
              });
          }

        });


    /*model.assign(this.$scope, 'JOSE FRANCISCO');
    model = this.$parse('variable0');
    model.assign(this.$scope, 'Francisco Javier');*/
    this.variables.push('variable0','variable1', 'variable2', 'variable3','variable4', 'variable5', 'variable6', 'variable7', 'variable8', 'variable9');
  /*  str.replace(/(__%%\S+%%__)/g , '{{$1}}');*/
    //this.$scope.html = this.$stateParams.params.info;// '<div style="border:1px solid red;">Working fine not really</div>';
    var originalString = this.$stateParams.params.info;
    var dynamicVariables = this.$stateParams.params.info.match(/(__%%)(\S+)(%%__)/g);
    console.log();
    var globalInfs = this.globalInf;
    dynamicVariables.forEach( function(value, index){
      console.log('***************************************************BEFORE*******************************');
      var beforeReplace = originalString;
      console.log(beforeReplace);
      var name = '{{variable'+ index + '}}';
      originalString = originalString.replace( new RegExp (value.toString(), 'g'), name);
      console.log('***************************************************new*******************************');
      console.log(originalString);
      if(beforeReplace === originalString){
        console.log('no cambio');
      }else{
        self.globalInf.push({originalName: value, newName:name });
      }


      //this.globalInf.push();
    });
    this.$scope.html = originalString;
    console.log(originalString);

    var x = 12;
  //  console.log(this.$stateParams.params.info.replace(/(__%%)(\S+)(%%__)/g , '{{$2}}'));
    console.log("LLEGAMOS");
    console.log("LLEGAMOS");
    //console.log(this.$stateParams.params2);
    //this.$state.go('page', {params: 'true'});

  }

  showPage(page){
    this.$state.go('page', {params: page});
  }
}

angular.module('laureateTestApp')
  .component('page', {
    templateUrl: 'app/page/page.html',
    controller: PageComponent,
    controllerAs: 'Page'
  });

})();
