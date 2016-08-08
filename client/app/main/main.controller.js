'use strict';

(function() {

    class MainController {

        constructor($http, $scope, ngDialog, $state, $parse) {
            this.$http = $http;
            this.$scope = $scope;
            this.ngDialog = ngDialog;
            this.$parse = $parse;
            this.$state = $state;
            this.awesomeThings = [];
            this.pages = [];
            this.alert = null;
            this.showAlert = false;
            this.dynamicVariables = null;
            this.globalInf = [];
            this.newObj = {};
            this.variables = [];
            this.showButton = false;
            this.showTextArea = false;
            this.showDVmessage = false;
            self = this;
        }

        $onInit() {
            /*this.$http.get('/api/things')
                .then(response => {
                    this.awesomeThings = response.data;
                });*/

            this.$http.get('/api/pages')
                .then(response => {
                    this.pages = response.data;
                });
            this.variables.push('variable0', 'variable1', 'variable2', 'variable3', 'variable4', 'variable5', 'variable6', 'variable7', 'variable8', 'variable9');
        }

        addThing() {
            if (this.newThing) {
                this.$http.post('/api/things', {
                    name: this.newThing
                });
                this.newThing = '';
            }
        }

        deleteThing(thing) {
            this.$http.delete('/api/things/' + thing._id);
        }

        open(page) {
            this.showTextArea = true;
            this.showButton = true;
            this.$scope.codigoHtml = page;
            this.ngDialog.open({
                template: 'templateId',
                className: 'ngdialog-theme-default',
                scope: this.$scope,
                width: '65%'
            });
        }

        openP() {
            var x = {
                name: 'prueba',
                info: 'contents'
            };
            this.$http.post('/api/pages', x)
                .then(response => {

                    if (response.data.error) {
                        this.$scope.estado = 'error';
                    } else {
                        this.$scope.estado = 'correcto';
                    }
                });

        }

        closeDialog() {
            this.ngDialog.closeAll();
        }

        saveChanges(page) {
          console.log("PRUEBA AL GUARDAR");
          console.log(this.$scope.codigoHtml.info);
          /*this.dynamicVariables = this.$scope.codigoHtml.info.match(/(__%%)(\S+)(%%__)/g);*/


          //  console.log(JSON.parse(JSON.stringify(this.newObj)));

          //  console.log(this.newObj.variable0);
        /*    page.userInput.push(this.globalInf);
            this.globalInf.forEach(function(value, index){
              console.log(self.newObj[value.nameModel.toString()]);
              page.userInput[0][index].userValue = self.newObj[value.nameModel.toString()];
            });
            console.log('user INput');
            console.log(page.userInput[0]);*/

          /*  var model = this.$parse('variable0');
            var x = this.$parse('variable')(this.$scope);
            x = this.$scope.$eval('variable');
            console.log('Francisco: ' + x);*/

              //console.log(page.userInput[0].);

            this.$http.patch('/api/pages/' + page._id, page)
                .then(response => {


                    if (response.data.error) {
                        console.log("Error");
                    } else {
                        console.log('Correcto');
                        this.ngDialog.closeAll();
                        this.showAlert = true;
                        this.alert = {
                            type: 'success',
                            msg: 'Codigo de página modificado exitosamente.'
                        };

                    }
                });
        }


        saveChangesDV(page, bol) {
          console.log("PRUEBA AL GUARDAR");
        //  console.log('length:' + this.dynamicVariables.length);
          //  console.log(JSON.parse(JSON.stringify(this.newObj)));

          //  console.log(this.newObj.variable0);
          console.log(this.globalInf);
          page.userInput = [];
            this.globalInf.forEach(function(value, index){
              console.log(self.newObj[value.nameModel.toString()]);
                value.userValue = self.newObj[value.nameModel.toString()];
                console.log('VALUE: ' + value.userValue);

                page.userInput.push(value);
            //  page.userInput[0][index].userValue = self.newObj[value.nameModel.toString()];
            });
            console.log('user INput');
            console.log(page.userInput);
            console.log(page);
          /*  var model = this.$parse('variable0');
            var x = this.$parse('variable')(this.$scope);
            x = this.$scope.$eval('variable');
            console.log('Francisco: ' + x);*/


              //console.log(page.userInput[0].);

            this.$http.patch('/api/pages/' + page._id, page)
                .then(response => {


                    if (response.data.error) {
                        console.log("Error");
                    } else {

                      if(bol !== 1){
                        console.log('Correcto');
                        this.ngDialog.closeAll();
                        this.showAlert = true;
                        this.alert = {
                            type: 'success',
                            msg: 'Codigo de página modificado exitosamente.'
                        };
                      }
                    }
                });
        }

        openDV(page, bol) {
            this.showTextArea = false;
            this.showButton = false;
            this.$scope.codigoHtml = page;
            this.newObj = {};
            this.showDVmessage = false;
            this.dynamicVariables = null;
            console.log('openningDV');
            console.log(page);

            var originalString = page.info;
            this.dynamicVariables = page.info.match(/(__%%)(\S+)(%%__)/g);
            console.log(this.dynamicVariables);

            this.globalInf = [];
            console.log('opening DV ');
            console.log('AJA: ' + page.userInput);
              console.log('AJA: ' + page.userInput.length);
            if(page.userInput.length === 0){
              if (this.dynamicVariables.length > 0){
                console.log('hay variables dinamicas');
            this.dynamicVariables.forEach(function(value, index) {
                console.log('***************************************************BEFORE*******************************');
                var beforeReplace = originalString;
                console.log(beforeReplace);
                var name = '{{variable' + index + '}}';
                originalString = originalString.replace(new RegExp(value.toString(), 'g'), name);
                console.log('***************************************************new*******************************');
                console.log(originalString);
                if (beforeReplace === originalString) {
                    console.log('no cambio');
                } else {
                    console.log(index);
                    self.globalInf.push({
                        originalName: value,
                        newName: name,
                        nameModel: 'variable' + index,
                        userValue: null
                    });
                }
            });
          }else{
            this.showDVmessage = true;
          }
          }else{
            console.log('ya existen variables dinamicas con nombre');
            this.globalInf = page.userInput;
            for (var i = 0; i < page.userInput.length; i++){
              console.log(page.userInput[i].userValue);
              this.newObj[page.userInput[i].nameModel] = page.userInput[i].userValue;
              /*var model = this.$parse(this.newObj[page.userInput[i].nameModel]);
              model.assign(this.$scope,page.userInput[i].userInput );*/
            }
          /*  var model = this.$parse(array[0].info);
            model.assign(this.$scope, 'JOSE FRANCISCO');*/
          }
          if (bol !== 1){
            this.ngDialog.open({
                template: 'templateId',
                className: 'ngdialog-theme-default',
                scope: this.$scope,
                width: '65%'
            });
          }
        }

        showPage(page) {
          console.log('FRANCISCO');
          console.log(page.userInput.length);
          if(page.userInput.length  === 0 ){
            console.log('input simulate');
            this.openDV(page, 1);
            this.saveChangesDV(page, 1);

          }
          
            this.$state.go('page', {
                params: page,
                params2:this.globalInf
            });
        }

        closeAlert() {
            this.showAlert = false;
        }

        clickMe() {
            this.dynamicVariables = this.$scope.fileContent.info.match(/(__%%)(\S+)(%%__)/g);
            console.log(null === this.dynamicVariables);
            if (null !== this.dynamicVariables) {
                if (this.dynamicVariables.length > 9) {

                    this.showAlert = true;
                    this.alert = {
                        type: 'danger',
                        msg: 'No puede tenes mas de 10 variables dinamicas. __%%variableName%%__'
                    };
                    return;
                }
            }

            var x = {
                name: 'prueba',
                info: this.$scope.fileContent
            };
            this.$http.post('/api/pages', this.$scope.fileContent)
                .then(response => {

                    if (response.data.error) {
                        this.$scope.estado = 'error';

                    } else {
                        this.$scope.estado = 'correcto';
                        console.log('despes de insert');
                        console.log(response.data);
                        this.pages.push(response.data);
                    }
                });
            //this.$scope.estado = 'correcto';
        }


    }

    angular.module('laureateTestApp')
        .component('main', {
            templateUrl: 'app/main/main.html',
            controller: MainController
        });
})();
