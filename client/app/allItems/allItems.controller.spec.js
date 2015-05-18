'use strict';

describe('Controller: AllItemsCtrl', function () {

  // load the controller's module
  beforeEach(module('sandwichChefApp'));

  var AllItemsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllItemsCtrl = $controller('AllItemsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
