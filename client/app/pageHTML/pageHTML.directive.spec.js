'use strict';

describe('Directive: pageHTML', function () {

  // load the directive's module and view
  beforeEach(module('laureateTestApp'));
  beforeEach(module('app/pageHTML/pageHTML.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<page-h-t-m-l></page-h-t-m-l>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the pageHTML directive');
  }));
});
