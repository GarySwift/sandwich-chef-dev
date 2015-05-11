'use strict';

describe('Service: itemMngr', function () {

  // load the service's module
  beforeEach(module('sandwichChefApp'));

  // instantiate service
  var itemMngr;
  beforeEach(inject(function (_itemMngr_) {
    itemMngr = _itemMngr_;
  }));

  it('should do something', function () {
    expect(!!itemMngr).toBe(true);
  });

});
