'use strict';

describe('Directive: itemForm', function () {

  // load the directive's module and view
  beforeEach(module('sandwichChefApp'));
  beforeEach(module('app/directives/itemForm/itemForm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<item-form></item-form>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the itemForm directive');
  }));
});