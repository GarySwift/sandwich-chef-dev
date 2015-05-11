'use strict';

describe('Controller: SandwichesCtrl', function () {

  // load the controller's module
  beforeEach(module('sandwichChefApp'));

  var SandwichesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SandwichesCtrl = $controller('SandwichesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
