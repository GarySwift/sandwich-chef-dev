'use strict';

describe('Controller: ItemCtrl', function () {

  // load the controller's module
  beforeEach(module('sandwichChefApp'));

  var ItemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemCtrl = $controller('ItemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
